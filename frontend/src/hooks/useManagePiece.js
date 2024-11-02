import { useEffect, useCallback, act } from "react";
import { TETROMINOS } from "../utils/tetrominoes";
import { PIECES_COLOR_CODES } from "../utils/piecesColorCodes";
import { PIECE_STARTING_ORIENTATIONS } from "../utils/pieceStartingOrientations";
import useCollisionDetection from "./useCollisionDetection";
import usePieceGenerator from "./usePieceGenerator";
import { useDispatch, useSelector } from 'react-redux';
import { setActivePiece, setActivePieceType, setPiecePosition, setOrientation, setGrid } from '../store/gameplaySlice';
import { setIsGameOver } from "../store/gameplaySlice";

const useManagePiece = (width, height) => {
	
	const dispatch = useDispatch();

	const grid = useSelector((state) => state.gameplay.grid);
	const activePiece = useSelector((state) => state.gameplay.activePiece);
	const activePieceType = useSelector((state) => state.gameplay.activePieceType);
	const piecePosition = useSelector((state) => state.gameplay.piecePosition);
	const orientation = useSelector((state) => state.gameplay.orientation);
	const isGameOver = useSelector((state) => state.gameplay.isGameOver);

	const { canMoveDown, canMoveRight, canMoveLeft, canRotate } = useCollisionDetection(width, height, grid);
	const getNextPiece = usePieceGenerator();

	/* check whether the piece can indeed be inserted */
	const isPieceInsertable = (piece, x, y, orientation) => {
		const shapeCoords = piece[orientation];
		const gameOver =  shapeCoords.some(([relY, relX]) => {
			const newY = y + relY;
			const newX = x + relX;
			return grid[newY] && grid[newY][newX] !== 0;
		});

		if (gameOver && !isGameOver) {
			dispatch(setIsGameOver(true));
			return false;
		}
		return true;
	}

	/* spawn an new piece */
	const spawnNewPiece = () => {
		const pieceLetterCode = getNextPiece();
		const piece = TETROMINOS[pieceLetterCode];

		if (!piece) {
			console.error('Unknown piece type: ', pieceLetterCode);
			return;
		}

		const initialX = Math.floor(width / 2) - Math.floor(TETROMINOS[pieceLetterCode][0].length / 2);
		const initialY = 0;

		if (!isPieceInsertable(piece, initialX,initialY, PIECE_STARTING_ORIENTATIONS[pieceLetterCode])) {
			return; 
		}
		
		dispatch(setPiecePosition({x: initialX, y: initialY}));
		dispatch(setActivePiece(piece));
		dispatch(setActivePieceType(pieceLetterCode));
		dispatch(setOrientation(PIECE_STARTING_ORIENTATIONS[pieceLetterCode]));
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
	const removePiece = useCallback(() => {
		const newGrid = grid.map((row) => [...row]);

		if (activePiece) {
			activePiece[orientation].forEach(([relY, relX]) => {
				const oldY = piecePosition.y + relY;
				const oldX = piecePosition.x + relX;
				newGrid[oldY][oldX] = 0;
			})	
		}
		dispatch(setGrid(newGrid));
	}, [dispatch, activePiece, grid, orientation, piecePosition]);

	const rotatePiece = useCallback(() => {
		if (activePiece) {
			const newOrientation = (orientation + 90) % 360;
		  	if (canRotate(activePiece, piecePosition.x, piecePosition.y, orientation, newOrientation)) {
				removePiece();
				dispatch(setOrientation(newOrientation));
		  	}
		}
	}, [dispatch, activePiece, piecePosition, orientation, canRotate, removePiece]);

	const movePieceRight = useCallback(() => {
		if (!activePiece || !canMoveRight(activePiece, piecePosition.x, piecePosition.y, orientation)) {
			return;
		}
		removePiece();
		dispatch(setPiecePosition({ x: piecePosition.x + 1, y: piecePosition.y }));
	}, [dispatch, activePiece, piecePosition, orientation, canMoveRight, removePiece]);

	const movePieceLeft = useCallback (() => {
		if (!activePiece || !canMoveLeft(activePiece, piecePosition.x, piecePosition.y, orientation)) {
			return;
		}
		removePiece();
		dispatch(setPiecePosition({ x: piecePosition.x - 1, y: piecePosition.y }));
	}, [dispatch, activePiece, piecePosition, orientation, canMoveLeft, removePiece]);

	const movePieceDown = () => {	
		if (!activePiece || !canMoveDown(activePiece, piecePosition.x, piecePosition.y, orientation)) {
			return false;
		}
		removePiece();
		dispatch(setPiecePosition({ x: piecePosition.x, y: piecePosition.y + 1 }));
		return true;
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
