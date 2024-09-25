import { useEffect } from "react";
import useModifyBoard from "./useModifyBoard";
import { TETROMINOS } from "../utils/tetrominoes";

const useSpawnNewPiece = (boardWidth, boardHeight, x, y, pieceType) => {

	const { board, updateCellColor, resetBoard } = useModifyBoard(boardWidth, boardHeight);
	
	useEffect(() => {
		if (!pieceType) return;

		const shape = TETROMINOS[pieceType]?.[0];
		if (!shape) {
			console.log('Unknown piece type:', pieceType); 
			return;
		}
		
		shape.forEach(([relativeX, relativeY]) => {
			const newX = x + relativeX;
			const newY = y + relativeY;

			updateCellColor(newX, newY, 1);
		});

	}, [pieceType, x, y]);

	return { board, resetBoard };
};

export default useSpawnNewPiece;
