import React from "react"
import styled from "styled-components"
import DeskCell from "./DeskCell"
import { columnsLetters, defaultPiecesPosition, piecesArray } from "../../defaults"
import { useDeskState } from "../../api/CustomHooks/useDeskState"
import useHandleUserClick from "../../api/CustomHooks/useHandleUserClick"
import { TDeskCell, TColumns, TRows, TPieces, TPieceData } from "../../types"
import { ColumnsHeader, RowsHeader } from "./DeskHeaders"
import { sizes } from "../../style/sizes"

const columnsArray: TDeskCell[] = columnsLetters.map((column: TColumns)=> ({
        name: '',
        row: 1,
        column: column,
        piece: undefined, 
        state: 'free',
        onClick: undefined
}))

const deskArray: TDeskCell[][] = []
for ( let i: TRows = 8; i >= 1; i-- ){
    deskArray.push(
        columnsArray.map(cell => ({
            ...cell,
            name: `${cell.column}${i}`,
            row: i,
        }))
    )
}

let piece: TPieces
const deskWithPieces: TDeskCell[][] = deskArray.map(column => column.map((cell: TDeskCell) => {
    for (piece in defaultPiecesPosition) {
        if (defaultPiecesPosition[piece] === cell.name){
            const res: TPieceData = piecesArray[piece]
            return {
                ...cell,
                piece: res
            }
        }
    }
    return cell
}))

const Desk: React.FC = () => {
    const [
        desk, 
        gameState, 
        movePiece, 
        changeCellState, 
        changeGameState, 
        changePieceState
    ] = useDeskState(deskWithPieces) 

    const [userDesk, handleUserClick] = useHandleUserClick([
        desk, 
        gameState, 
        movePiece, 
        changeCellState, 
        changeGameState, 
        changePieceState
    ])
    return (
        <DeskWrapper>
        <RowsHeader />
                <div>
                    <ColumnsHeader />
                    <StyledDesk>
                    {userDesk.map((row, index) => 
                    <StyledRow key={`row_${index + 1}`}>
                        {row.map(deskCell => 
                        <DeskCell 
                            key={deskCell.name} 
                            name={deskCell.name}
                            row={deskCell.row} 
                            column={deskCell.column} 
                            state={deskCell.state}
                            piece={deskCell.piece}
                            onClick={() => handleUserClick(deskCell)}
                        /> )
                        } 
                    </StyledRow>
                    )}
            </StyledDesk>
            <ColumnsHeader />
            </div>
                
            <RowsHeader />
        </DeskWrapper>
        
)}

export default Desk

const DeskWrapper = styled.div(() => ({
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
}))

const StyledDesk = styled.div(() => ({
    width: sizes.deskSize,
    height: sizes.deskSize,
    display: 'flex',
    'flex-direction': 'column',
    border: '4px solid green',
    '@media(orientation: portrait)':{
        width: sizes.portraitDeskSize,
        height: sizes.portraitDeskSize,
    }
}))

const StyledRow = styled.div(() => ({
    display: 'flex',
    width: '100%',
    height:  '100%'
}))






