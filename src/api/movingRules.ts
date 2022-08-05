import { TCells, TColumns, TDeskCell, TPieceData, TRows } from "../types";
import { findCell, isNotUndefined } from "../defaults";
import { createLinesKnight, createLinesPawn, createLinesQBR } from "./createLines";

const rulesQBR = (desk: TDeskCell[][], lines:TCells[][], piece: TPieceData) => {
    const moveArray: TCells[] = []
    const attackArray: TCells[] = []

    lines.forEach(line => {
        let occupiedCell: TDeskCell | undefined = undefined; 
        
        [...line].reverse().forEach(cell => {
        const resCell = findCell(desk, cell)
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

const rulesKingKnight = (desk: TDeskCell[][], lines:TCells[], piece: TPieceData) => {
    const moveArray:TCells[] = lines.filter(filteredCell => {
        const targetCell:TDeskCell | undefined  = findCell(desk, filteredCell)
        return(targetCell && !targetCell?.piece) 
    })

    const attackArray: TCells[] = lines.filter(filteredCell => {
        const targetCell:TDeskCell | undefined = findCell(desk, filteredCell)
        return(targetCell?.piece && targetCell?.piece?.color !== piece.color)
    })
    return {moveArray, attackArray}
}

const rulesPawn = (desk: TDeskCell[][], moveLines:TCells[], attackLines: TCells[], piece: TPieceData) => {
    let moveArray:TCells[] = []
    let occupiedCell: TCells | undefined = undefined; 
    moveLines.forEach(cell => {   
    const resCell = findCell(desk, cell)
        if (resCell.piece){
            occupiedCell = resCell.name
        }})
        const res: TCells[] = [...moveLines]
        moveArray = occupiedCell ? res.slice(0, res.indexOf(occupiedCell)) : res             


    const attackArray: TCells[] = attackLines.filter(filteredCell => {
        const targetCell:TDeskCell | undefined = findCell(desk, filteredCell)
        return(targetCell?.piece && targetCell?.piece?.color !== piece.color)
    })
    return {moveArray, attackArray}
}

    const findAvailableCells = (cell: TDeskCell, desk: TDeskCell[][]):{move:TCells[], attack:TCells[]} => {

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
            const kingArrays = rulesKingKnight(desk, interRes, piece)
            return {move:kingArrays.moveArray, attack:kingArrays.attackArray}

        case 'Queen':
        const queenArrays = rulesQBR(desk, allLines, piece)
            return {move:queenArrays.moveArray, attack:queenArrays.attackArray}

        case 'Bishop':
            const bishopArrays = rulesQBR(desk, diagonalLines, piece)
            return {move:bishopArrays.moveArray, attack:bishopArrays.attackArray}
            
        case 'Knight':
            const knightArr = createLinesKnight(pieceRow, pieceColumn)
            const knightArrays = rulesKingKnight(desk, knightArr, piece)
            return {move:knightArrays.moveArray, attack:knightArrays.attackArray}

        case 'Rook':
            const rookArrays = rulesQBR(desk, straightLines, piece)
            return {move:rookArrays.moveArray, attack:rookArrays.attackArray}
                  
        case 'Pawn':
            const {pawnMove, pawnAttack} = createLinesPawn(pieceRow, pieceColumn, piece.color, piece.firstMove)
            const pawnArrays = rulesPawn(desk, pawnMove, pawnAttack, piece)
            return {move:pawnArrays.moveArray, attack:pawnArrays.attackArray}
                
        default:
            break;
    }
    return {move:[], attack:[]}
}

export default findAvailableCells