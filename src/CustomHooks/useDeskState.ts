import { useCallback, useState } from "react";
import { flattenDesk } from "../defaults";
import { TDeskCell, TCells, TCellState, TFigureData, TUseDeskState, TGameState } from "../types";



export const useDeskState = (initState: TDeskCell[][]): TUseDeskState => {

    const [desk, setDesk] = useState<TDeskCell[][]>(initState)
    const [gameState, setGameState] = useState<TGameState>({
        colorTurn: 'white',
        activeCell: ''
    })

    const setCellState  = useCallback((
        cellName: TCells, 
        field: string, 
        value: string | TFigureData | undefined): void => { 
      setDesk((desk) => [...desk].map((column: TDeskCell[]) => {
        return [...column].map((cell: TDeskCell) => {
           if (cell.name !== cellName) {return cell}
           return {...cell, [field]: value}
        })
    })
    )},[])

    const moveFigure = (from: TCells, to: TCells): void => {
        let movingFigure: TFigureData | undefined = undefined

        flattenDesk(desk).forEach((cell: TDeskCell) => {
                if (cell.name === from) {
                    movingFigure = cell.figure
                    }});
        if (!movingFigure) {return}
        
        setCellState(from, 'figure', undefined) 
        setCellState(to, 'figure', movingFigure)    
    }

    const changeCellState = (cell:TCells, state:TCellState) => {
        setCellState(cell, 'state', state) 
        
    }
    const changeGameState = useCallback((field: string, value: string | TDeskCell) => {
        setGameState((state) => ({...state, [field]: value}))
    }, [])

    moveFigure('e8', 'e4')
        
    return [desk, gameState, moveFigure, changeCellState, changeGameState]
}
