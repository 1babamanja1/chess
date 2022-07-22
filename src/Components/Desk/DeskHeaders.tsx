import styled from "styled-components"
import { columnsLetters } from "../../defaults"
import { rowsNumbers } from "../../defaults"
import { sizes } from "../../style/sizes"

export const RowsHeader: React.FC = () => {
    return (
    <RowsHeaderWrapper>
        {rowsNumbers.map(number => <div key={number}>{number}</div>)}
    </RowsHeaderWrapper>
        )}

export const ColumnsHeader: React.FC = () => {
    return (
    <ColumnsHeaderWrapper>
        {columnsLetters.map(letter => <div key={letter}>{letter}</div>)}
    </ColumnsHeaderWrapper>
        )}


const RowsHeaderWrapper = styled.div(() => ({
    display: 'flex',
    'flex-direction': 'column-reverse',
    height: sizes.deskSize,
    width: sizes.headerShortLength,
    'justify-content': 'space-around',
    'align-items': 'center',
    'font-size': '22px',
    color: 'green',
    '@media(orientation: portrait)':{
        height: sizes.portraitDeskSize,
    }
}))
const ColumnsHeaderWrapper = styled.div(() => ({
    display: 'flex',
    'justify-content': 'space-around',
    'align-items': 'center',
    width: '100%',
    height: sizes.headerShortLength,
    'font-size': '22px',
    color: 'green',
}))

