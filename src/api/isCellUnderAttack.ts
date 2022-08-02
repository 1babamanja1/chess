import { TCells, TColors, TDeskCell } from "../types"
import findAvailableCells from "./movingRules"

export const findAlivePieces = (desk: TDeskCell[][], color: TColors) => {
    const res = desk.flat().filter(cell => cell.piece && cell.piece.color === color).map(cell => ({...cell?.piece, cell: cell}))
    return res
}
export const isCellUnderAttack = (desk: TDeskCell[][], cellName:TCells, attackerColor:TColors) => {
    let cellsUnderAttack: TCells[] = []
    const alivePieces = findAlivePieces(desk, attackerColor)

    alivePieces.forEach(item => {
        const {move, attack} = findAvailableCells(item.cell, desk)
        cellsUnderAttack.push(...[...move, ...attack])
    })

    return cellsUnderAttack.includes(cellName)
}