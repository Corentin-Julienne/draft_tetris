import { createSlice } from "@reduxjs/toolkit";

const gameplaySlice = createSlice({
	name: 'gameplay',
	initialState: {
		activePiece: null,
		piecePosition: {x: 0, y: 0},
		orientation: 0,
	},
	reducers: {
		// setActivePiece: (state, action) => {

		// },
		// modifyCoords: (state, action) => {

		// },
		modifyOrientation: (state, action) => {
			state.value = action.payload;
		}
	}
})

export default gameplaySlice.reducer;
