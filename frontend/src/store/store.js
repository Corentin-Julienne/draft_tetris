import { configureStore } from "@reduxjs/toolkit";
import gameplayReducer from "./gameplaySlice";

const store = configureStore({
	reducer: {
		gameplay: gameplayReducer,
	}
});

export default store;
