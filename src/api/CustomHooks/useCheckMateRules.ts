import { findKing, oppositeColor } from "../../defaults"
import { TCells, TColors, TDeskCell, TPieceData } from "../../types"
import { isCellUnderAttack } from "../isCellUnderAttack"
import findAvailableCells from '../movingRules'

type TUseCheckMateRules = (desk: TDeskCell[][]) => [
    (from: TCells, to: TCells, kingColor: TColors) => boolean,
    (kingColor: TColors) => {checkmate: boolean, stalemate: boolean}
]

const movePiece = (desk: TDeskCell[][], from: TCells, to: TCells): TDeskCell[][] => {
    let movingPiece: TPieceData | undefined = undefined
    desk.flat().forEach((cell: TDeskCell) => {
            if (cell.name === from) {
                movingPiece = cell.piece
                }
        });   
    if (!movingPiece) {return desk}   
    let result: TDeskCell[][] = desk.map(row => row.map(cell => {
        if (cell.name === from) {
            return {...cell, piece: undefined}
        }
        if (cell.name === to) {
            return {...cell, piece: movingPiece}
        }
        return cell
    }))
    return result
}

export const isKingUnderCheck = (desk: TDeskCell[][], kingColor: TColors) => {
    const kingCell:TDeskCell | undefined = findKing(desk, kingColor)
    if (!kingCell){return false}
    return isCellUnderAttack(desk, kingCell.name, oppositeColor(kingColor))
}

const useCheckMateRules: TUseCheckMateRules = (desk: TDeskCell[][]) => {

     const isMoveLeadsToCheck = (from: TCells, to: TCells, kingColor: TColors) => {
       const nextDesk = movePiece(desk, from, to)
        return(isKingUnderCheck(nextDesk, kingColor))
    }

     const checkmateStalemate = (kingColor: TColors): {checkmate: boolean, stalemate: boolean} => {
        let checkmate = true;
        let stalemate = true;

        const allyPieces = desk.flat().filter(cell => cell?.piece?.color === kingColor)
        const allyMoves = allyPieces.map(cell => {
                const {move, attack} = findAvailableCells(cell, desk)
                return({
                from: cell.name,
                to: [...move, ...attack]
            })
        })

        allyMoves.filter(cell => cell.to.length > 0).forEach(cell => {
            cell.to.forEach(move => {
                if (!isMoveLeadsToCheck(cell.from, move, kingColor)){
                    checkmate = false
                    stalemate = false
                } 
            })
        })

        const kingCell:TDeskCell | undefined = findKing(desk, kingColor)
        if (!kingCell){return {checkmate: false, stalemate: false}}
        isKingUnderCheck(desk, kingColor) ? stalemate = false : checkmate = false
        return ({checkmate, stalemate})
    }

    return [isMoveLeadsToCheck, checkmateStalemate]
}

export default useCheckMateRules