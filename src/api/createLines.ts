import { columnsLetters, findShortestArrayLength, reversedColumnsLetters, rowsNumbers } from "../defaults"
import { TCells, TColors, TColumns, TRows } from "../types"

export const createLinesQBR = (pieceRow:TRows, pieceColumn:TColumns): {
    up: TCells[],
    down: TCells[], 
    right: TCells[], 
    left: TCells[], 
    upRight: TCells[], 
    upLeft: TCells[], 
    downRight: TCells[], 
    downLeft: TCells[]

} => {

    let upRows: TRows[] = []
    let downRows: TRows[] = []
    let rightColumns: TColumns[] = []
    let leftColumns: TColumns[] = []

    let up: TCells[] = []
    let down: TCells[] = []
    let right: TCells[] = []
    let left: TCells[] = []
    let upRight: TCells[] = []
    let upLeft: TCells[] = []
    let downRight: TCells[] = []
    let downLeft: TCells[] = []

    for (let i:TRows = pieceRow; i <= 8; i++){
        i !== pieceRow && upRows.push(i)
    }
    for (let i:TRows = pieceRow; i >= 1; i--){
        i !== pieceRow && downRows.push(i)
    }
    columnsLetters.slice(columnsLetters.indexOf(pieceColumn), 8).forEach(column => {
        column !== pieceColumn && rightColumns.push(column)
    })
    reversedColumnsLetters.slice(reversedColumnsLetters.indexOf(pieceColumn), 8).forEach(column => {
        column !== pieceColumn && leftColumns.push(column)
    })

    up = upRows.map(row =>{
        let res: TCells =  `${pieceColumn}${row}`
        return res
    })
    down = downRows.map(row =>{
        let res: TCells =  `${pieceColumn}${row}`
        return res
    })
    right = rightColumns.map(column =>{
        let res: TCells =  `${column}${pieceRow}`
        return res
    })
    left  = leftColumns.map(column =>{
        let res: TCells =  `${column}${pieceRow}`
        return res
    })

    const trimUpRight = findShortestArrayLength(upRows, rightColumns)
    const trimUpLeft = findShortestArrayLength(upRows, leftColumns)
    const trimDownRight = findShortestArrayLength(downRows, rightColumns)
    const trimDownLeft = findShortestArrayLength(downRows, leftColumns)

    for (let i = 0; i < trimUpRight; i++){
        upRight.push(`${rightColumns[i]}${upRows[i]}`)
    }

    for (let i = 0; i < trimUpLeft; i++){
        upLeft.push(`${leftColumns[i]}${upRows[i]}`)
    }

    for (let i = 0; i < trimDownRight; i++){
        downRight.push(`${rightColumns[i]}${downRows[i]}`)
    }

    for (let i = 0; i < trimDownLeft; i++){
        downLeft.push(`${leftColumns[i]}${downRows[i]}`)
    }

    return ({up, down, right, left, upRight, upLeft, downRight, downLeft})

}

export const createLinesKnight = (pieceRow:TRows, pieceColumn:TColumns) => {
    const indexOfRow = rowsNumbers.indexOf(pieceRow)
    const indexOfColumn = columnsLetters.indexOf(pieceColumn)

    const longRow: TRows[] = [rowsNumbers[indexOfRow + 2], rowsNumbers[indexOfRow - 2]]
    .filter(cell => rowsNumbers.includes(cell))
    const shortRow: TRows[] = [rowsNumbers[indexOfRow + 1], rowsNumbers[indexOfRow - 1]]
    .filter(cell => rowsNumbers.includes(cell))
    const longColumn: TColumns[] = [columnsLetters[indexOfColumn + 2], columnsLetters[indexOfColumn - 2]]
    .filter(cell => columnsLetters.includes(cell))
    const shortColumn: TColumns[] = [columnsLetters[indexOfColumn + 1], columnsLetters[indexOfColumn - 1]]
    .filter(cell => columnsLetters.includes(cell))
    const result: TCells[] =[]

    longRow.forEach(row => {
        shortColumn.forEach(column => {
            result.push(`${column}${row}`)}
            )})
    shortRow.forEach(row => {
        longColumn.forEach(column => {
            result.push(`${column}${row}`)}
            )})
    return result
}

export const createLinesPawn = (
    pieceRow:TRows, 
    pieceColumn:TColumns, 
    color: TColors, 
    firstMove: boolean): {
        pawnMove: TCells[], 
        pawnAttack: TCells[]
    } => {
    let indexOfPieceInRow = rowsNumbers.indexOf(pieceRow)
    let indexOfPieceInColumn = columnsLetters.indexOf(pieceColumn)

    let counter: number = 1
    color === 'white' ? counter += 1 : counter -= 1
    firstMove ? counter += 1 : counter += 0 

    const preRes = [
        [indexOfPieceInRow - 1],
        [indexOfPieceInRow - 1, indexOfPieceInRow -2],
        [indexOfPieceInRow + 1],
        [indexOfPieceInRow + 1, indexOfPieceInRow + 2],      
    ].map(row => row.filter(item => rowsNumbers[item]))

    const resultMove:TCells[] = preRes[counter].map(ind =>{ 
        const res:TCells = `${pieceColumn}${rowsNumbers[ind]}`
        return res
        })
    const attackRow:TRows =  rowsNumbers[color === 'white' ? indexOfPieceInRow + 1 : indexOfPieceInRow - 1]
    const attackColumns:TColumns[] = [columnsLetters[indexOfPieceInColumn -1], columnsLetters[indexOfPieceInColumn +1]]
                            .filter(cell => columnsLetters.includes(cell))
    const resultAttack:TCells[] = attackColumns.map(column => {
        const res:TCells = `${column}${attackRow}`
        return res
    })
    return {pawnMove: resultMove, pawnAttack: resultAttack}
}

export const createCastlingSet = () => {}