import { useEffect, useState } from "react";
import useManagePiece from "./useManagePiece";

const useModifyGrid = ( width, height ) => {

	/* initialized the board at launch */
	const initialGrid = Array.from({ length: height }, () =>
		Array(width).fill(0)
	);
	const [ grid, setGrid ] = useState(initialGrid);

	/* delegate piece management to specialized hook */
	const { spawnNewPiece, rotatePieceLeft, rotatePieceRight, movePieceDown } 
	= useManagePiece(width, height, setGrid);

	/* used to spawn a new piece form a button (dev feature only) */
	const addPieceToGrid = (pieceType) => {
		spawnNewPiece(pieceType);
	}

	/* reset the grid (dev feature only, to be removed) */
	const resetGrid = () => {
		setGrid(Array.from({ length: height }, () => Array(width).fill(0)));
	};

	/* player inputs manager */
	useEffect(() => {
		const handleKeyDown = (event) => {
			switch (event.key) {
				case "ArrowLeft":
					rotatePieceLeft();
					break;
				case "ArrowRight": 
					rotatePieceRight();
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
	}, [rotatePieceLeft, rotatePieceRight, movePieceDown]);

	/* gravity manager */
	useEffect(() => {
		const interval = setInterval(() => {
			movePieceDown();
		}, 1000);

		return () => clearInterval(interval);
	}, [movePieceDown]);

	
	return { grid, addPieceToGrid, resetGrid };
}

export default useModifyGrid;
