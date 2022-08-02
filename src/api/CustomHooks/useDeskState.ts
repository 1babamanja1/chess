import { useReducer } from "react";
import { TDeskCell, TCells, TCellState, TPieceData, TUseDeskState, TGameState} from "../../types";

export const useDeskState = (initState: TDeskCell[][]): TUseDeskState => {

    function isNotUndefined<T> (argument: T | undefined): argument is T {
        return argument !== undefined 
    }

    const gameState: TGameState = {
        colorTurn: 'white',
        activeCell: ''
    }

    const initials = {
        desk: initState,
        game: gameState
    }

    const [state, setState] = useReducer(deskReducer, initials)
    
    function deskReducer(
        state:{
            desk: TDeskCell[][],
            game: TGameState
     }, action: { 
            type: string; 
            payload: any
     }){
        switch (action.type) {
            case 'setCellState':{
                const {cellName, field, value} = action.payload  
                const res = [...state.desk].map((column: TDeskCell[]) => (
                    [...column].map((cell: TDeskCell) => {
                        return (cell.name !== cellName) ? cell : {...cell, [field]: value}
                            }
                        )
                    )
                )
                return {...state, desk: res};
            }  
          
            case 'changeGameState':{
                const {field, value} = action.payload  
                let game = ({...state.game, [field]: value})
                return {...state, game};
            }  

            case 'changePieceState':{
                const {cell, pieceField, value} = action.payload  
                let desk = [...state.desk]
                let pic:TPieceData | undefined = undefined
                if(!cell|| !pieceField || value) {return state}

                desk.flat().forEach((stateCell: TDeskCell) => {
                    if (stateCell.name === cell){
                        const statePiece = [stateCell.piece].filter(isNotUndefined)[0]
                        pic = {...statePiece, [pieceField]: value}
                    }
                })

            const res = [...state.desk].map((column: TDeskCell[]) => {
                return [...column].map((stateCell: TDeskCell) => {
                   if (stateCell.name !== cell) {return stateCell}
                   return {...stateCell, piece: pic}
                }
            )})
            return {...state, desk: res};
            }  
            default:
              throw new Error();
          }
    }

    const setCellState  = (cellName: TCells, field: string, value: string | TPieceData | undefined): void => { 
        setState({type: 'setCellState', payload: {cellName, field, value}})
    }

    const changeGameState = (field: string, value: string | TDeskCell) => {
        setState({type: 'changeGameState', payload: {field, value}})
    }

    const changePieceState = (cell:TCells, pieceField: string, value: string | boolean) => {
        setState({type: 'changePieceState', payload: {cell, pieceField, value}})
    }

    const changeCellState = (cell:TCells, state:TCellState) => {
        setCellState(cell, 'state', state)         
    }

    const movePiece = (from: TCells, to: TCells): void => {
        let movingPiece: TPieceData | undefined = undefined
        state.desk.flat().forEach((cell: TDeskCell) => {
                if (cell.name === from) {
                    movingPiece = cell.piece
                    }
            });   
        if (!movingPiece) {return}
        setCellState(from,  'piece',  undefined)
        setCellState(to,  'piece',  movingPiece)     
    }
        
    return [state.desk, state.game, changeCellState, movePiece, changeGameState, changePieceState]
}
