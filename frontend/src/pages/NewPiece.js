import React from "react";
import Cell from "./Cell";

const NewPiece = () => {
	
	const CELL_WIDTH = 30;
	const CELL_HEIGHT = 30;

	const NEW_PIECE_WIDTH = 4;
	const NEW_PIECE_HEIGHT = 2;

	const NEW_PIECE_BOARD_WIDTH = CELL_WIDTH * NEW_PIECE_WIDTH;
	const NEW_PIECE_BOARD_HEIGHT = CELL_HEIGHT * NEW_PIECE_HEIGHT;

	const board = Array.from({ length: NEW_PIECE_HEIGHT }, () => 
		Array(NEW_PIECE_WIDTH).fill(0)
	);
	
	const newPieceContainerStyle = {
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	}

	const newPieceBoardStyle = {
		width: NEW_PIECE_BOARD_WIDTH,
		height: NEW_PIECE_BOARD_HEIGHT,
		boxSizing: 'border-box',
		display: 'grid',
		gridTemplateRows: `repeat(${NEW_PIECE_HEIGHT}, 1fr)`,
		gridTemplateColumns: `repeat(${NEW_PIECE_WIDTH}, 1fr)`,
	}

	const newPieceStyle = {
		margin: 0,
		padding: 0,
		paddingBottom: '25px',
	}
	
	return (
		<div style={newPieceContainerStyle}>
			<h2 style={newPieceStyle}>New Piece</h2>
			<div style={newPieceBoardStyle}>
				{board.map((row, rowIndex) => 
					row.map((cell, cellIndex) => 
						<Cell key={`${rowIndex}-${cellIndex}`} color={cell === 0 ? 'black' : 'blue'}/>)
				)}
			</div>
		</div>
	)
}

export default NewPiece;
