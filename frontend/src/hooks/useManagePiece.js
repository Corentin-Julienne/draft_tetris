import { useState } from "react";
import { TETROMINOS } from "../utils/tetrominoes";
import { PIECES_COLOR_CODES } from "../utils/piecesColorCodes";
import { PIECE_STARTING_ORIENTATIONS } from "../utils/pieceStartingOrientations";

const useManagePiece = (width, height, setGrid) => {

	const [ activePiece, setActivePiece ] = useState(null);
	const [ piecePosition, setPiecePosition ] = useState({x: 0, y: 0});
	const [ rotation, setRotation ] = useState(0);
	
	/* spawn an new piece */
	const spawnNewPiece = (pieceType) => {
		const piece = TETROMINOS[pieceType];

		if (!piece) {
			console.error('Unknown piece type: ', pieceType);
			return;
		}

		const initialX = Math.floor(width / 2) - Math.floor(TETROMINOS[pieceType][0].length / 2);
		const initialY = 0;
		
		setPiecePosition({x: initialX, y: initialY});
		setActivePiece(piece);
		setRotation(0);
		updateGridWithPiece(piece[PIECE_STARTING_ORIENTATIONS[pieceType]], 
			initialX, 
			initialY, 
			PIECES_COLOR_CODES[pieceType]);
	}

	/* general updater for the grid when there is a move */
	const updateGridWithPiece = (shapeCoords, x, y, colorCode) => {
		
		if (!shapeCoords) return;
		
		console.log('shapecords = ', shapeCoords);
		
		setGrid((prevGrid) => {
			const newGrid = prevGrid.map((row) => [...row]);

			shapeCoords.forEach(([relY, relX]) => {

				console.log('relX = ', relX, ' and relY = ', relY);

				const newX = x + relX;
				const newY = y + relY;

				console.log('newX = ', newX, ' and newY = ', newY);
				newGrid[newY][newX] = colorCode;
			});

			return newGrid;
		})
	};

	/* used to removed the piece when producing a move, to later display the piece in new position */
	const removePiece = (prevPos) => {
		setGrid((prevGrid) => {
			const newGrid = prevGrid.map((row) => [...row]);

			activePiece[rotation].forEach(([relY, relX]) => {
				const oldX = prevPos.x + relX;
				const oldY = prevPos.y + relY;
				newGrid[oldY][oldX] = 0;
			})
			
			return newGrid;
		});
	}
	
	/* rotate piece, left direction */
	const rotatePieceLeft = () => {

	}

	/* rotate piece, right direction */
	const rotatePieceRight = () => {

	}

	/* move piece down */
	const movePieceDown = () => {	
		if (!activePiece) {
			return;
		}
		
		setPiecePosition((prevPos) => {
			const newY = prevPos.y + 1;

			removePiece(prevPos);

			updateGridWithPiece(activePiece[rotation], 
				prevPos.x, 
				newY, 
				PIECES_COLOR_CODES[activePiece.type]);

			return {...prevPos, y: newY};
		});
	}

	return {spawnNewPiece, rotatePieceLeft, rotatePieceRight, movePieceDown};
}

export default useManagePiece;
