import styled from 'styled-components'
import  UnderMoveDot  from '../../assets/circle.svg'
import { sizes } from '../../style/sizes';
import { TDeskCell, TStyledCell } from '../../types';

const DeskCell: React.FC<TDeskCell> = ({row, column, figure, state, onClick}) => {
    const isCellBlack = (row + column.charCodeAt(0)) % 2 === 0
  return (
    <StyledCell 
        isBlack={isCellBlack} 
        state={state}
        onClick={onClick}
        >
        {figure?.asset && <StyledFigure src={figure.asset} alt={`${figure.color}_${figure.type}`}/>}
        {state === 'underMove' && <StyledImg src={UnderMoveDot} alt='under move'/>}
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
        underAttack: 'green'
    },
    white: {
        free: 'white',
        active: 'yellow',
        underMove: 'white',
        underAttack: 'white'
    },  
}

const StyledCell = styled.div<TStyledCell>(({isBlack, state}) => ({
    width: `${1/8 * 100}%`,
    height:  `100%`,
    backgroundColor: isBlack ? backgroundColors.black[state] : backgroundColors.white[state],
    boxShadow: state === 'underAttack' ? 'inset 0 0 3px 3px rgba(255, 0, 0, 100%)' : 'none',
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

const StyledFigure = styled.img(() => ({
    width: '85%',
    height: '85%',
}))
