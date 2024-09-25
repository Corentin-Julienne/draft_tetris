import { useState } from "react";

const useModifyBoard = (width, height) => {

	/* initialized the board at launch */
	const initialBoard = Array.from({ length: height }, () =>
		Array(width).fill(0)
	);

	const [ board, setBoard ] = useState(initialBoard);

	/* update color of a single cell */
	const updateCellColor = (rowIndex, cellIndex, colorCode) => {
		setBoard(prevBoard =>
			prevBoard.map((row, rIdx) => 
				row.map((cell, cIdx) => 
					rIdx === rowIndex && cIdx === cellIndex ? colorCode : cell
				)
			)	
		);
	};
 
	/* reset the board */
	const resetBoard = () => {
		setBoard(Array.from({ length: height }, () => Array(width).fill(0)));
	};

	return { board, updateCellColor, resetBoard };
}

export default useModifyBoard;
