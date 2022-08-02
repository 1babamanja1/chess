import { TDeskCell, TUseDeskState } from "../../types"
import findAvailableCells from "../movingRules"

const useHandleUserClick = ([desk, gameState,  changeCellState, movePiece, changeGameState, changePieceState]: TUseDeskState):[
    TDeskCell[][],
    (cell:TDeskCell) => void
] => {
    const getAvailableCells = (cell:TDeskCell) => {
        return findAvailableCells(cell, desk)
    }

    const resetActiveState = () => {
        changeGameState('activeCell', '')
        desk.flat().forEach((flattenCell: TDeskCell)=> changeCellState(flattenCell.name, 'free'))
    }

    const handleUserClick = (cell: TDeskCell) => {
        console.log()
        if (!gameState.activeCell && !cell.piece){return}
        if (gameState.activeCell && cell.name === gameState.activeCell.name){
            resetActiveState()
            return
        }
        if(gameState.activeCell && cell.state === 'underMove'){
            movePiece(gameState.activeCell.name, cell.name)
            changePieceState(cell.name, 'firstMove', false) 
            changeGameState('colorTurn', gameState.colorTurn === 'white' ? 'black' : 'white')
            resetActiveState()
        }
        if(gameState.activeCell && cell.state === 'underAttack'){
            movePiece(cell.name, '')
            movePiece(gameState.activeCell.name, cell.name) 
            changePieceState(cell.name, 'firstMove', false) 
            changeGameState('colorTurn', gameState.colorTurn === 'white' ? 'black' : 'white')
            resetActiveState()
        }
        if(!gameState.activeCell && cell.piece && cell.piece.color === gameState.colorTurn){
            changeGameState('activeCell', cell)
            changeCellState(cell.name, 'active')
            getAvailableCells(cell).move?.map(cell => changeCellState(cell, 'underMove'))
            getAvailableCells(cell).attack?.map(cell => changeCellState(cell, 'underAttack'))
    }}
    return [desk, handleUserClick]
}

export default useHandleUserClick