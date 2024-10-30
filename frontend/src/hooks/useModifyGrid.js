import { useRef, useEffect } from "react";
import useManagePiece from "./useManagePiece";
import { useDispatch, useSelector } from 'react-redux';
import { resetGrid } from '../store/gameplaySlice';

const useModifyGrid = ( width, height ) => {

	const dispatch = useDispatch();
	const grid = useSelector((state) => state.gameplay.grid);

	/* delegate piece management to specialized hook */
	const { spawnNewPiece, movePieceLeft, movePieceRight, rotatePiece, movePieceDown } 
	= useManagePiece(width, height);

	/* used to spawn a new piece form a button (dev feature only) */
	const addPieceToGrid = (pieceType) => {
		spawnNewPiece(pieceType);
	}

	/* reset the grid (dev feature only, to be removed) */
	const resetGrid = () => {
		dispatch(resetGrid());
	};

	/* player inputs manager */
	useEffect(() => {
		const handleKeyDown = (event) => {
			switch (event.key) {
				case "ArrowUp":
					rotatePiece();
					break;
				case "ArrowLeft":
					movePieceLeft();
					break;
				case "ArrowRight": 
					movePieceRight();
					break;
				case "ArrowDown":
					movePieceDown();
					break;
				default:
					break;
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		}
	}, [movePieceLeft, movePieceRight, rotatePiece, movePieceDown]);

	/* gravity manager */
	const applyGravityRef = useRef(() => {
		movePieceDown();
	});

	useEffect(() => {
		applyGravityRef.current = movePieceDown;
	}, [movePieceDown]);

	useEffect(() => {
		const interval = setInterval(() => {
			applyGravityRef.current();
		}, 500);

		return () => clearInterval(interval);
	}, []);
	
	return { grid, addPieceToGrid, resetGrid };
}

export default useModifyGrid;
