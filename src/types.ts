export type TRows =  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 
export type TColumns = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' ; 
export type TCells = `${TColumns}${TRows}` | ''
export type TCellState = 'free' | 'active' | 'underMove' | 'underAttack';
export type TColors = 'black' | 'white';
export type TFigureType = 'King' | 'Queen' | 'Bishop' | 'Knight' | 'Rook' | 'Pawn';
export type TFigures = `${TColors}${'King' | 'Queen'}` | `${TColors}${'Bishop' | 'Knight' | 'Rook'}${1 | 2}` | `${TColors}Pawn${TRows}`

export type TCell = {
        row: TRows;
        column: TColumns;
        state: TCellState;
}

export type TFigureData = { 
    asset: string | '';
    color: TColors;
    type: TFigureType;
    firstMove?: boolean;
}

// export type TDesk = {
//     name: TCells;
//     row: TRows;
//     column: TColumns;
//     figure: TFigures | '';
//     state: TCellState;
//     onClick?: () => void;
// }

export type TDeskCell = {
    name: TCells;
    row: TRows;
    column: TColumns;
    figure: TFigureData | undefined;
    state: TCellState;
    onClick: (() => void) | undefined;
}

export type TStyledCell = {
    isBlack: boolean;
    state: TCellState;
}

export type TGameState = {
    colorTurn: 'black' | 'white',
    activeCell: '' | TDeskCell,
}

export type TUseDeskState = [
    TDeskCell[][],
    TGameState,
    (from: TCells, to: TCells) => void, 
    (cell:TCells, state:TCellState) => void,
    (field:string, value: string | TDeskCell) => void
]