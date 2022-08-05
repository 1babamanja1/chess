import styled from 'styled-components'
import  UnderMoveDot  from '../../assets/circle.svg'
import { TDeskCell, TStyledCell } from '../../types';

const DeskCell: React.FC<TDeskCell> = ({row, column, piece, state, onClick}) => {
    const isCellBlack = (row + column.charCodeAt(0)) % 2 === 0
  return (
    <StyledCell 
        isBlack={isCellBlack} 
        state={state}
        onClick={onClick}
        >
        {piece?.asset && <StyledPiece src={piece.asset} alt={`${piece.color}_${piece.type}`}/>}
        {(state === 'underMove' || state ==='underRestrictedMove') && <StyledImg src={UnderMoveDot} alt='under move'/>}
        {state === 'underCastling' && <StyledImg src={UnderMoveDot} alt='under castling'/>}
    </StyledCell>
    )}

export default DeskCell

interface IBackgrounds {
     [key: string]: {
        [key: string]: string
    }
}
const backgroundColors: IBackgrounds = {
    black: {
        free: 'green',
        active: 'yellow',
        underMove: 'green',
        underAttack: 'green',
        underCastling: 'green',
        underRestrictedMove: 'grey',
        underRestrictedAttack: 'grey',
        underCheck: 'orange',
    },
    white: {
        free: 'white',
        active: 'yellow',
        underMove: 'white',
        underAttack: 'white',
        underCastling: 'white',
        underRestrictedMove: 'grey',
        underRestrictedAttack: 'grey',
        underCheck: 'orange',
    },  
}

const StyledCell = styled.div<TStyledCell>(({isBlack, state}) => ({
    width: `${1/8 * 100}%`,
    height:  `100%`,
    backgroundColor: isBlack ? backgroundColors.black[state] : backgroundColors.white[state],
    boxShadow: state === 'underAttack' || state === 'underRestrictedAttack' ? 'inset 0 0 3px 3px rgba(255, 0, 0, 100%)' : 'none',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}))

const StyledImg = styled.img(() => ({
    width: '85%',
    height: '85%',
    fill: 'darkgreen',
    // position: 'center',
}))

const StyledPiece = styled.img(() => ({
    width: '85%',
    height: '85%',
}))
