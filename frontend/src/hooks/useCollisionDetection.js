import { useSelector } from "react-redux";
import { useCallback } from "react";

const useCollisionDetection = (width, height) => {

	const grid = useSelector((state) => state.gameplay.grid);

	const isOutOfBound = (x, y) => {
		return x < 0 || x >= width || y >= height;
	}

	const isOccupied = (x, y) => {
		return grid[y] && grid[y][x] !== 0; 
	}

	const checkCollision = (piece, x, y, orientation) => {
		const shapeCoords = piece[orientation];

		for (let [relY, relX] of shapeCoords) {
			const newX = x + relX;
			const newY = y + relY;
			if (isOutOfBound(newX, newY) || isOccupied(newX, newY)) {
				return true;
			}
		}
		return false;
	}

	const canMoveDown = useCallback((piece,x, y, orientation) => {
		return !checkCollision(piece, x, y + 1, orientation);
	}, [grid, width, height]);

	const canMoveLeft = useCallback((piece, x, y, orientation) => {
		return !checkCollision(piece, x - 1, y, orientation);
	}, [grid, width, height]);

	const canMoveRight = useCallback((piece, x, y, orientation) => {
		return !checkCollision(piece, x + 1, y ,orientation);
	}, [grid, width, height]);

	const canRotate = useCallback((piece, x, y, newOrientation) => {
		return !checkCollision(piece, x, y, newOrientation);
	}, [grid, width, height]);

	return { canMoveDown, canMoveLeft, canMoveRight, canRotate };
}

export default useCollisionDetection;
