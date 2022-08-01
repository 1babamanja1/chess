import { TCells, TColumns, TDeskCell, TPieceData, TRows } from "../types";
import { flattenDesk } from "../defaults";
import { createLinesKnight, createLinesPawn, createLinesQBR } from "./createLines";

const findAvailableCells = (cell: TDeskCell, desk: TDeskCell[][]):{move:TCells[] | [], attack:TCells[] | []} => {

function isNotUndefined<T> (argument: T | undefined): argument is T {
    return argument !== undefined 
}

const rulesQBR = (lines:TCells[][]) => {
    const moveArray: TCells[] = []
    const attackArray: TCells[] = []

        lines.forEach(line => {
                let occupiedCell: TDeskCell | undefined = undefined; 
                
                [...line].reverse().forEach(cell => {
                const resCell = [flattenDesk(desk).find(deskCell => 
                    deskCell.name === cell)].filter(isNotUndefined)[0]
                    if (resCell.piece){
                        occupiedCell = resCell
                    }
                })
                if(occupiedCell) { 
                    const res: TDeskCell = occupiedCell
                    moveArray.push(...line.slice(0, line.indexOf(res.name)))
                    res?.piece?.color !== piece.color && attackArray.push(res.name)                    
                } else {
                    moveArray.push(...line)
                }
            })
            return {moveArray, attackArray}
}

const rulesKingKnight = (lines:TCells[]) => {
    const moveArray:TCells[] | [] = lines.filter(filteredCell => {
        const targetCell:TDeskCell | undefined  = flattenDesk(desk).find(cell => cell.name === filteredCell)
        return(!targetCell?.piece) 
    })

    const attackArray: TCells[] | [] = lines.filter(filteredCell => {
        const targetCell:TDeskCell | undefined = flattenDesk(desk).find(cell => cell.name === filteredCell)
        return(targetCell?.piece && targetCell?.piece?.color !== piece.color)
    })

    return {moveArray, attackArray}
}

const rulesPawn = (moveLines:TCells[], attackLines: TCells[]) => {
    const moveArray:TCells[] | [] = moveLines.filter(filteredCell => {
        const targetCell:TDeskCell | undefined  = flattenDesk(desk).find(cell => cell.name === filteredCell)
        return(!targetCell?.piece) 
    })

    const attackArray: TCells[] | [] = attackLines.filter(filteredCell => {
        const targetCell:TDeskCell | undefined = flattenDesk(desk).find(cell => cell.name === filteredCell)
        return(targetCell?.piece && targetCell?.piece?.color !== piece.color)
    })
    return {moveArray, attackArray}
}

    const piece:TPieceData = [cell.piece].filter(isNotUndefined)[0]
    const pieceRow:TRows = cell.row
    const pieceColumn:TColumns = cell.column

    const  {up, down, right, left, upRight, upLeft, downRight, downLeft} = createLinesQBR(pieceRow, pieceColumn)

    const straightLines = [up, down, right, left]
    const diagonalLines = [upRight, upLeft, downRight, downLeft]
    const allLines = [...straightLines, ...diagonalLines]

    switch (piece.type) {
        case 'King':
            let interRes: TCells[] = []
            allLines.forEach(line => 
                   interRes.push(line[0])
                )
            const kingArrays = rulesKingKnight(interRes)
            return {move:kingArrays.moveArray, attack:kingArrays.attackArray}

        case 'Queen':
        const queenArrays = rulesQBR(allLines)
            return {move:queenArrays.moveArray, attack:queenArrays.attackArray}

        case 'Bishop':
            const bishopArrays = rulesQBR(diagonalLines)
            return {move:bishopArrays.moveArray, attack:bishopArrays.attackArray}
            
        case 'Knight':
            const knightArr = createLinesKnight(pieceRow, pieceColumn)
            const knightArrays = rulesKingKnight(knightArr)
            return {move:knightArrays.moveArray, attack:knightArrays.attackArray}

        case 'Rook':
            const rookArrays = rulesQBR(straightLines)
            return {move:rookArrays.moveArray, attack:rookArrays.attackArray}
                  
        case 'Pawn':
            const {pawnMove, pawnAttack} = createLinesPawn(pieceRow, pieceColumn, piece.color, piece.firstMove)
            const pawnArrays = rulesPawn(pawnMove, pawnAttack)
            return {move:pawnArrays.moveArray, attack:pawnArrays.attackArray}
                
        default:
            break;
    }
    return {move:[], attack:[]}
}

export default findAvailableCells