import React, {useState} from "react";
import Cell from "./Cell";
import useSpawnNewPiece from "../hooks/useSpawnNewPiece";

const Board = () => {
	
	/* dimensions of the board, in numbers of cells */
	const BOARD_WIDTH = 10;
	const BOARD_HEIGHT = 20;
	/* dimensions of an individual cell */
	const CELL_WIDTH = 30;
	const CELL_HEIGHT = 30;
	/* dimensions of the board, in pixels */
	const BOARD_WIDTH_PIXELS = BOARD_WIDTH * CELL_WIDTH;
	const BOARD_HEIGHT_PIXELS = BOARD_HEIGHT * CELL_HEIGHT;

	const [ pieceType, setPieceType ] = useState(null);
	const { board, resetBoard } = useSpawnNewPiece(BOARD_WIDTH, BOARD_HEIGHT, 0, 0, pieceType);
	
	const boardContainerStyle = {
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	}

	const boardCellsContainerStyle = {
		width: BOARD_WIDTH_PIXELS,
		height: BOARD_HEIGHT_PIXELS,
		display: 'grid',
		gridTemplateRows: `repeat(${BOARD_HEIGHT}, 1fr)`,
		gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
		boxSizing: 'border-box',
	}
	
	return (
		<div style={boardContainerStyle}>
			<div style={boardCellsContainerStyle}>
				{board.map((row, rowIndex) =>
          			row.map((cell, cellIndex) => (
            			<Cell key={`${rowIndex}-${cellIndex}`} colorCode={cell} />
          			))
        		)}
			</div>
			{/* Button to spawn a new piece */}
			<button onClick={() => setPieceType("I")}>Spawn "I" Piece</button>
      		<button onClick={resetBoard}>Reset Board</button>
		</div>
	)
}

export default Board;
