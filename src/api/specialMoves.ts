import { createCell, findCell, oppositeColor } from "../defaults"
import { TCastlingWay, TCells, TColors, TColumns, TDeskCell, TRows } from "../types"
import { isCellUnderAttack } from "./isCellUnderAttack"

const castlingSet = (color: TColors, longOrShort: TCastlingWay) => {
    const row:TRows = color === 'white' ? 1 : 8
    const addRow = (arr:TColumns[]) => arr.map(column => createCell(column, row))
    return longOrShort === 'long' ?
       {
            shouldBeEmpty: addRow(['b', 'c', 'd']),
            shouldBeFirstMove: addRow(['a', 'e']),
            shouldNotBeUnderAttack: addRow(['e', 'd', 'c'])
        } : { 
            shouldBeEmpty: addRow(['f', 'g']),
            shouldBeFirstMove: addRow(['e', 'h']),
            shouldNotBeUnderAttack: addRow(['e', 'f', 'g'])
        }

}

export const castling = (desk:TDeskCell[][], color: TColors) => {
    let castlingCells:TCells[] = []
    let isCastlingAvailable: {long: boolean, short: boolean} = {long: true, short: true};
    let reason: string = ''
    const ways: TCastlingWay[] = ['long', 'short']

    ways.forEach((way: TCastlingWay) => {
        castlingSet(color, way).shouldBeEmpty.forEach(cell => {
            const resCell = findCell(desk, cell) 
            if (resCell?.piece?.type){
                isCastlingAvailable[way] = false
                reason = 'notEmpty'
            }
        })
        castlingSet(color, way).shouldBeFirstMove.forEach(cell => {
            const resCell = findCell(desk, cell) 
            if (!resCell?.piece?.firstMove){
                isCastlingAvailable[way] = false
                reason = 'firstMove'
            }
        })
        castlingSet(color, way).shouldNotBeUnderAttack.forEach(cell => {
            const resCell = findCell(desk, cell) 
            if (isCellUnderAttack(desk, resCell.name, oppositeColor(color))){
                isCastlingAvailable[way] = false
                reason = 'underAttack'
            }
        })

    })
    if (isCastlingAvailable.long) {
        castlingCells.push(castlingSet(color, 'long').shouldBeEmpty[1])
    }
    if (isCastlingAvailable.short) {
        castlingCells.push(castlingSet(color, 'short').shouldBeEmpty[1])
    }
    return castlingCells
}

export const enPassant = () => {}

export const promotion = () => {}