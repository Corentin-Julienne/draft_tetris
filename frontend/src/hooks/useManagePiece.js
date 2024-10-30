import { useEffect } from "react";
import { TETROMINOS } from "../utils/tetrominoes";
import { PIECES_COLOR_CODES } from "../utils/piecesColorCodes";
import { PIECE_STARTING_ORIENTATIONS } from "../utils/pieceStartingOrientations";
import { useDispatch, useSelector } from 'react-redux';
import { setActivePiece, setActivePieceType, setPiecePosition, setOrientation, setGrid } from '../store/gameplaySlice';

const useManagePiece = (width, height) => {
	
	const dispatch = useDispatch();

	const grid = useSelector((state) => state.gameplay.grid);
	const activePiece = useSelector((state) => state.gameplay.activePiece);
	const activePieceType = useSelector((state) => state.gameplay.activePieceType);
	const piecePosition = useSelector((state) => state.gameplay.piecePosition);
	const orientation = useSelector((state) => state.gameplay.orientation);
	
	/* spawn an new piece */
	const spawnNewPiece = (pieceType) => {
		const piece = TETROMINOS[pieceType];

		if (!piece) {
			console.error('Unknown piece type: ', pieceType);
			return;
		}

		const initialX = Math.floor(width / 2) - Math.floor(TETROMINOS[pieceType][0].length / 2);
		const initialY = 0;
		
		dispatch(setPiecePosition({x: initialX, y: initialY}));
		dispatch(setActivePiece(piece));
		dispatch(setActivePieceType(pieceType));
		dispatch(setOrientation(PIECE_STARTING_ORIENTATIONS[pieceType]));
	}

	/* general updater for the grid when there is a move */
	const updateGridWithPiece = (shapeCoords, x, y, colorCode) => {
		
		if (!shapeCoords) return;

		const newGrid = grid.map((row) => [...row]);

		shapeCoords.forEach(([relY, relX]) => {
			const newY = y + relY;
			const newX = x + relX;
			newGrid[newY][newX] = colorCode;
		});

		dispatch(setGrid(newGrid));
	};

	/* used to removed the piece when producing a move, to later display the piece in new position */
	const removePiece = () => {
		const newGrid = grid.map((row) => [...row]);

		if (activePiece) {
			activePiece[orientation].forEach(([relY, relX]) => {
				const oldY = piecePosition.y + relY;
				const oldX = piecePosition.x + relX;
				newGrid[oldY][oldX] = 0;
			})	
		}
		dispatch(setGrid(newGrid));
	}
	
	/* rotate piece, left direction */
	const rotatePiece = () => {
		if (!activePiece) {
			return;
		}
		removePiece();

		const newOrientation = (orientation + 90) % 360;
	
		dispatch(setOrientation(newOrientation));
	}

	/* rotate piece, right direction */
	const movePieceRight = () => {
		if (!activePiece) {
			return;
		}
		removePiece();
		dispatch(setPiecePosition({ x: piecePosition.x + 1, y: piecePosition.y}));
	}

	const movePieceLeft = () => {
		if (!activePiece) {
			return;
		}
		removePiece();
		dispatch(setPiecePosition({ x: piecePosition.x - 1, y: piecePosition.y}));
	}

	/* move piece down */
	const movePieceDown = () => {	
		if (!activePiece) {
			return;
		}
		removePiece();
		dispatch(setPiecePosition({ x: piecePosition.x, y: piecePosition.y + 1 }));
	}

	/* update grid when a parameter changes */
	useEffect(() => {
		if (activePiece && activePieceType && piecePosition && orientation !== null) {
			updateGridWithPiece(
				activePiece[orientation],
				piecePosition.x,
				piecePosition.y,
				PIECES_COLOR_CODES[activePieceType]
			);
		}		
	}, [activePiece, activePieceType, piecePosition, orientation]);

	return {spawnNewPiece, rotatePiece, movePieceRight, movePieceLeft, movePieceDown};
}

export default useManagePiece;
