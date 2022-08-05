export type TRows =  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 
export type TColumns = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' ; 
export type TCells = `${TColumns}${TRows}` | ''
export type TCellState = 'free' | 'active' | 'underMove' | 'underAttack' | 'underCastling' | 'underRestrictedMove' | 'underRestrictedAttack' | 'underCheck';
export type TColors = 'black' | 'white';
export type TPieceType = 'King' | 'Queen' | 'Bishop' | 'Knight' | 'Rook' | 'Pawn' | 'PseudoPawn';
export type TPieces = `${TColors}${'King' | 'Queen'}` | `${TColors}${'Bishop' | 'Knight' | 'Rook'}${1 | 2}` | `${TColors}Pawn${TRows}`
export type TCastlingWay = 'long' | 'short'

export type TCell = {
        row: TRows;
        column: TColumns;
        state: TCellState;
}

export type TPieceData = { 
    asset: string;
    color: TColors;
    type: TPieceType;
    firstMove: boolean;
}

export type TDeskCell = {
    name: TCells;
    row: TRows;
    column: TColumns;
    piece: TPieceData | undefined;
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
    state: 'game' | 'checkmate' | 'stalemate'
}

export type TUseDeskState = [
    TDeskCell[][],
    TGameState,
    (cell: TCells, state:TCellState) => void,
    (from: TCells, to: TCells) => void, 
    (field: string, value: string | TDeskCell) => void,
    (cell:TCells, pieceField: string, value: string | boolean) => void,
    () => void
]