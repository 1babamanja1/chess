import { useCallback, useEffect } from "react"
import { flattenDesk } from "../defaults"
import { TDeskCell, TUseDeskState } from "../types"
import findAvailableCells from "./movingRules"

const useHandleUserClick = ([desk, gameState, moveFigure, changeCellState, changeGameState]: TUseDeskState):[
    TDeskCell[][],
    (cell:TDeskCell) => void
] => {
    const getAvailableCells = (cell:TDeskCell) => {
        return findAvailableCells(cell, desk)
    }

    const resetActiveState = () => {
        changeGameState('activeCell', '')
        flattenDesk(desk).forEach((flattenCell: TDeskCell)=> changeCellState(flattenCell.name, 'free'))
    }
    // useEffect(() => {console.log(desk)},[desk])
    const handleUserClick = (cell: TDeskCell) => {
        if (!gameState.activeCell && !cell.figure){return}
        if (gameState.activeCell && cell.name === gameState.activeCell.name){
            resetActiveState()
            return
        }
        if(gameState.activeCell && cell.state === 'underMove'){
            moveFigure(gameState.activeCell.name, cell.name)
            resetActiveState()
        }
        if(gameState.activeCell && cell.state === 'underAttack'){
            moveFigure(cell.name, '')
            moveFigure(gameState.activeCell.name, cell.name)
            resetActiveState()
        }
        if(!gameState.activeCell && cell.figure){
        changeGameState('activeCell', cell)
        changeCellState(cell.name, 'active')
        getAvailableCells(cell).move?.map(cell => changeCellState(cell, 'underMove'))
        getAvailableCells(cell).attack?.map(cell => changeCellState(cell, 'underAttack'))
    }}
    return [desk, handleUserClick]
}

export default useHandleUserClick