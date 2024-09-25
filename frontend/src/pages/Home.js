import React from "react";
import Board from "./Board";
import NewPiece from "./NewPiece";
import OpponentBoards from "./OpponentBoard";

const Home = () => {

	const homeContainerStyle = {
		width: '100vw',
		height: '100vh',
		display: 'grid',
		gridTemplateColumns: '1fr 1fr 1fr',
		gap: '24px',
		margin: 0,
		padding: '50px',
	}

	const boardContainerStyle = {
		width: '100%',
		height: '100%',
		gridColumn: '1 / 3',
	}

	const hudContainerStyle = {
		width: '100%',
		height: '100%',
		gridColumn: '3 / 4',
		display: 'grid',
		gridTemplateRows: '1fr 1fr 1fr',
		gap: '24px',
	}

	const nextPieceContainerStyle = {
		width: '100%',
		height: '100%',
		gridRow: '1 / 2',
	}

	const opponentBoardsContainerStyle = {
		width: '100%',
		height: '100%',
		gridRow: '2 / 4',
	}
	
	return (
		<div style={homeContainerStyle}>
			<div style={boardContainerStyle}>
				<Board/>
			</div>
			<div style={hudContainerStyle}>
				<div style={nextPieceContainerStyle}>
					<NewPiece/>
				</div>
				<div style={opponentBoardsContainerStyle}>
					<OpponentBoards/>
				</div>
			</div>
		</div>
	)
}

export default Home;
