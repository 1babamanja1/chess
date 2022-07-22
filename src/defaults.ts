import  WhiteKingPic  from './assets/white-king.svg'
import  WhiteQueenPic  from './assets/white-queen.svg'
import  WhiteBishopPic  from './assets/white-bishop.svg'
import  WhiteKnightPic  from './assets/white-knight.svg'
import  WhiteRookPic  from './assets/white-rook.svg'
import  WhitePawnPic  from './assets/white-pawn.svg'

import  BlackKingPic  from './assets/black-king.svg'
import  BlackQueenPic  from './assets/black-queen.svg'
import  BlackBishopPic  from './assets/black-bishop.svg'
import  BlackKnightPic  from './assets/black-knight.svg'
import  BlackRookPic  from './assets/black-rook.svg'
import  BlackPawnPic  from './assets/black-pawn.svg'
import { TCells, TFigures, TColumns, TFigureData, TRows, TDeskCell } from './types'

export const figuresArray: Record<Exclude<TFigures, ''>, TFigureData> = {
      whiteKing: {
        asset: WhiteKingPic,
        color: 'white',
        type: 'King',
    },
    whiteQueen: {
        asset: WhiteQueenPic,
        color: 'white',
        type: 'Queen',
        
    },
    whiteBishop1: {
        asset: WhiteBishopPic,
        color: 'white',
        type: 'Bishop',
        
    },
    whiteBishop2: {
        asset: WhiteBishopPic,
        color: 'white',
        type: 'Bishop',
        
    },
    whiteKnight1: {
        asset: WhiteKnightPic,
        color: 'white',
        type: 'Knight',
        
        
    },
    whiteKnight2: {
        asset: WhiteKnightPic,
        color: 'white',
        type: 'Knight',
        
    },
    whiteRook1: {
        asset: WhiteRookPic,
        color: 'white',
        type: 'Rook',
        
    },
    whiteRook2: {
        asset: WhiteRookPic,
        color: 'white',
        type: 'Rook',
        
    },
    whitePawn1: {
        asset: WhitePawnPic,
        color: 'white',
        type: 'Pawn',
        firstMove: true,
        
    },
    whitePawn2: {
        asset: WhitePawnPic,
        color: 'white',
        type: 'Pawn',
        firstMove: true,
        
    },
    whitePawn3: {
        asset: WhitePawnPic,
        color: 'white',
        type: 'Pawn',
        firstMove: true,
        
    },
    whitePawn4: {
        asset: WhitePawnPic,
        color: 'white',
        type: 'Pawn',
        firstMove: true,
        
    },
    whitePawn5: {
        asset: WhitePawnPic,
        color: 'white',
        type: 'Pawn',
        firstMove: true,
        
    },
    whitePawn6: {
        asset: WhitePawnPic,
        color: 'white',
        type: 'Pawn',
        firstMove: true,
        
    },
    whitePawn7: {
        asset: WhitePawnPic,
        color: 'white',
        type: 'Pawn',
        firstMove: true,
        
    },
    whitePawn8: {
        asset: WhitePawnPic,
        color: 'white',
        type: 'Pawn',
        firstMove: true,
    },

    blackKing: {
        asset: BlackKingPic,
        color: 'black',
        type: 'King',
        
    },
    blackQueen: {
        asset: BlackQueenPic,
        color: 'black',
        type: 'Queen',
        
    },
    blackBishop1: {
        asset: BlackBishopPic,
        color: 'black',
        type: 'Bishop',
        
    },
    blackBishop2: {
        asset: BlackBishopPic,
        color: 'black',
        type: 'Bishop',
        
    },
    blackKnight1: {
        asset: BlackKnightPic,
        color: 'black',
        type: 'Knight',
        
    },
    blackKnight2: {
        asset: BlackKnightPic,
        color: 'black',
        type: 'Knight',
        
    },
    blackRook1: {
        asset: BlackRookPic,
        color: 'black',
        type: 'Rook',
        
    },
    blackRook2: {
        asset: BlackRookPic,
        color: 'black',
        type: 'Rook',
        
    },
    blackPawn1: {
        asset: BlackPawnPic,
        color: 'black',
        type: 'Pawn',
        firstMove: true,
        
    },
    blackPawn2: {
        asset: BlackPawnPic,
        color: 'black',
        type: 'Pawn',
        firstMove: true,
        
    },
    blackPawn3: {
        asset: BlackPawnPic,
        color: 'black',
        type: 'Pawn',
        firstMove: true,
        
    },
    blackPawn4: {
        asset: BlackPawnPic,
        color: 'black',
        type: 'Pawn',
        firstMove: true,
        
    },
    blackPawn5: {
        asset: BlackPawnPic,
        color: 'black',
        type: 'Pawn',
        firstMove: true,
        
    },
    blackPawn6: {
        asset: BlackPawnPic,
        color: 'black',
        type: 'Pawn',
        firstMove: true,
        
    },
    blackPawn7: {
        asset: BlackPawnPic,
        color: 'black',
        type: 'Pawn',
        firstMove: true,
        
    },
    blackPawn8: {
        asset: BlackPawnPic,
        color: 'black',
        type: 'Pawn',
        firstMove: true,
        
    },
}

export const defaultFiguresPosition: Record<Exclude<TFigures, ''>, TCells> = {
    whiteKing: 'e1',
    whiteQueen: 'd1',
    whiteBishop1: 'c1',
    whiteBishop2: 'f1', 
    whiteKnight1: 'b1',
    whiteKnight2: 'g1',
    whiteRook1: 'a1',
    whiteRook2: 'h1',
    whitePawn1: 'a2',
    whitePawn2: 'b2',
    whitePawn3: 'c2',
    whitePawn4: 'd2',
    whitePawn5: 'e2',
    whitePawn6: 'f2',
    whitePawn7: 'g2',
    whitePawn8: 'h2',

    blackKing: 'e8',
    blackQueen: 'd8',
    blackBishop1: 'c8',
    blackBishop2: 'f8',
    blackKnight1: 'b8',
    blackKnight2: 'g8',
    blackRook1: 'a8',
    blackRook2: 'h8',
    blackPawn1: 'a7',
    blackPawn2: 'b7',
    blackPawn3: 'c7',
    blackPawn4:'d7',
    blackPawn5:'e7',
    blackPawn6: 'f7',
    blackPawn7: 'g7',
    blackPawn8: 'h7',
}

export const figuresEnum: TFigures[] = [ 
'whiteKing',
'whiteQueen',
'whiteBishop1',
'whiteBishop2',
'whiteKnight1',
'whiteKnight2',
'whiteRook1',
'whiteRook2',
'whitePawn1',
'whitePawn2',
'whitePawn3',
'whitePawn4',
'whitePawn5',
'whitePawn6',
'whitePawn7',
'whitePawn8',
'blackKing',
'blackQueen',
'blackBishop1',
'blackBishop2',
'blackKnight1',
'blackKnight2',
'blackRook1',
'blackRook2',
'blackPawn1',
'blackPawn2',
'blackPawn3',
'blackPawn4',
'blackPawn5',
'blackPawn6',
'blackPawn7',
'blackPawn8'
];

export const columnsLetters: TColumns[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
export const rowsNumbers: TRows[] = [ 1, 2, 3, 4, 5, 6, 7, 8 ]

export const flattenDesk = (desk: TDeskCell[][]): TDeskCell[]=> {
    let res: TDeskCell[] = []
    desk.forEach(row => res.push(...row))
    return res
}