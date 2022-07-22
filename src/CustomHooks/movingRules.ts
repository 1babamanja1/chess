import { TCells, TCellState, TColumns, TDeskCell, TFigureData, TFigures, TRows } from "../types";
import { columnsLetters, flattenDesk } from "../defaults";
import { rowsNumbers } from "../defaults";

const findAvailableCells = (cell: TDeskCell, desk: TDeskCell[][]):{move:TCells[] | [], attack:TCells[] | []} => {

    function isNotUndefined<TFigures> (argument: TFigures | undefined): argument is TFigures{
        return argument !== undefined 
    }
    const figure: TFigureData = [cell.figure].filter(isNotUndefined)[0]
    const figureRow = cell.row
    const figureColumn = cell.column

    console.log(figure)

    switch (figure.type) {
        case 'King':
            let interRes: TCells[] = []
            let columns: TColumns[] = []
            let rows:  TRows[] = []
           
            if (rowsNumbers[rowsNumbers.indexOf(figureRow) - 1]){
                rows.push(rowsNumbers[rowsNumbers.indexOf(figureRow) -1])
            }
            rows.push(rowsNumbers[rowsNumbers.indexOf(figureRow)])
            if (rowsNumbers[rowsNumbers.indexOf(figureRow) + 1]){
                rows.push(rowsNumbers[rowsNumbers.indexOf(figureRow) + 1])
            }

            if (columnsLetters[columnsLetters.indexOf(figureColumn) - 1]){
                columns.push(columnsLetters[columnsLetters.indexOf(figureColumn) - 1])
            }
            columns.push(columnsLetters[columnsLetters.indexOf(figureColumn)])
            if (columnsLetters[columnsLetters.indexOf(figureColumn) + 1]){
                columns.push(columnsLetters[columnsLetters.indexOf(figureColumn) + 1])
            }

             rows.forEach(row => 
                columns.forEach(column => {
                    interRes.push(`${column}${row}`)
                }))
            // const res = 
            const moveArr:TCells[] | [] = interRes.filter(filteredCell => {
                const targetCell:TDeskCell | undefined  = flattenDesk(desk).find(cell => cell.name === filteredCell)
                return(!targetCell?.figure) 
            })

            const attackArr: TCells[] | [] = interRes.filter(filteredCell => {
                const targetCell:TDeskCell | undefined = flattenDesk(desk).find(cell => cell.name === filteredCell)
                return(targetCell?.figure && targetCell?.figure?.color !== figure.color)
            })
            return {move:moveArr, attack:attackArr}

        case 'Queen':
            
            break;

        case 'Bishop':
            
             break;

        case 'Knight':
            
            break;

        case 'Rook':
            
            break;
                  
        case 'Pawn':
            
            break;
                
        default:
            break;
    }
    return {move:[], attack:[]}
}

export default findAvailableCells