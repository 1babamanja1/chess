import { useEffect } from "react"
import { findKing, oppositeColor } from "../../defaults"
import { TColumns, TDeskCell, TUseDeskState } from "../../types"
import findAvailableCells from "../movingRules"
import { castling } from "../specialMoves"
import useCheckMateRules, { isKingUnderCheck } from "./useCheckMateRules"

const useHandleUserClick = ([desk, gameState,  changeCellState, movePiece, changeGameState, changePieceState]: TUseDeskState):[
    TDeskCell[][],
    (cell:TDeskCell) => void
] => {
    const [isMoveLeadsToCheck, checkmateStalemate] = useCheckMateRules(desk)

    const getAvailableCells = (cell:TDeskCell) => {
        return findAvailableCells(cell, desk)
    }

    const resetActiveState = () => {
        changeGameState('activeCell', '')
        desk.flat().forEach((flattenCell: TDeskCell)=> changeCellState(flattenCell.name, 'free'))
    }

    useEffect(() => {
        if(isKingUnderCheck(desk, gameState.colorTurn)){
            const kingUnderCheck = findKing(desk, gameState.colorTurn) 
            if (!kingUnderCheck){return}    
            changeCellState(kingUnderCheck.name, 'underCheck')
        }
    }, [gameState.activeCell])

    useEffect(() => {
        if (checkmateStalemate(gameState.colorTurn).checkmate){
            changeGameState('state', 'checkmate')
        }
        if(checkmateStalemate(gameState.colorTurn).stalemate){
            changeGameState('state', 'stalemate')
        }
    }, [gameState.activeCell])

    const handleUserClick = (cell: TDeskCell) => {
        if (!gameState.activeCell && !cell.piece){return}
        if (gameState.activeCell && cell.name === gameState.activeCell.name){
            resetActiveState()
            return
        }
        if(gameState.activeCell && cell.state === 'underMove'){
            movePiece(gameState.activeCell.name, cell.name)
            changePieceState(cell.name, 'firstMove', false) 
            changeGameState('colorTurn',  oppositeColor(gameState.colorTurn))
            resetActiveState()
        }
        if(gameState.activeCell && cell.state === 'underAttack'){
            movePiece(cell.name, '')
            movePiece(gameState.activeCell.name, cell.name) 
            changePieceState(cell.name, 'firstMove', false) 
            changeGameState('colorTurn',  oppositeColor(gameState.colorTurn))
            resetActiveState()
        }
        if(gameState.activeCell && cell.state === 'underCastling'){
            const moves: TColumns[] = cell.column === 'g' ? ['h', 'f'] : ['a', 'd'] 
            movePiece(`${moves[0]}${cell.row}`, `${moves[1]}${cell.row}`)
            movePiece(gameState.activeCell.name, cell.name) 
  
            changePieceState(`${moves[1]}${cell.row}`, 'firstMove', false) 
            changePieceState(cell.name, 'firstMove', false) 
            changeGameState('colorTurn', oppositeColor(gameState.colorTurn))
            resetActiveState()
        }
        if(!gameState.activeCell && cell.piece && cell.piece.color === gameState.colorTurn){
            changeGameState('activeCell', cell)
            changeCellState(cell.name, 'active')
            getAvailableCells(cell).move?.map(toCell => {
                if(!isMoveLeadsToCheck(cell.name, toCell, gameState.colorTurn)){
                    return changeCellState(toCell, 'underMove')
                } else {
                    return changeCellState(toCell, 'underRestrictedMove')
                }
            })
            getAvailableCells(cell).attack?.map(toCell => {
                if(!isMoveLeadsToCheck(cell.name, toCell, gameState.colorTurn)){
                    return changeCellState(toCell, 'underAttack')
                } else {
                    return changeCellState(toCell, 'underRestrictedAttack')
                }
            })
            cell.piece.type === 'King' && castling(desk, cell.piece.color).map(cell => changeCellState(cell, 'underCastling'))
    }}
    
    return [desk, handleUserClick]
}

export default useHandleUserClick