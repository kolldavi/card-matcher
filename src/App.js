import React, { Component } from 'react';
import './styles/App.css';
import CardGame from './components/CardGame';
import EndGame from './components/EndGame';
import StartGame from './components/StartGame';
const GAME_STATE = {
	START_GAME: 'START_GAME',
	PLAYING_GAME: 'PLAYING_GAME',
	END_GAME: 'END_GAME'
};
class App extends Component {
	state = {
		gameState: GAME_STATE.START_GAME,
		results: { time: 0 },
		mode: 4
	};

	changeState(newState) {
		this.setState({ gameState: newState.gameState, mode: newState.mode });
	}

	updateResults(results) {
		this.setState({ results: results });
	}

	render() {
		const { gameState, results, mode } = this.state;

		return (
			<div className="App">
				{gameState === GAME_STATE.START_GAME && (
					<div className="card-container">
						<StartGame changeState={newState => this.changeState(newState)} />
					</div>
				)}
				{gameState === GAME_STATE.PLAYING_GAME && (
					<div className="card-container">
						<CardGame
							changeState={newState => this.changeState(newState)}
							updateResults={newResults => this.updateResults(newResults)}
							mode={mode}
						/>
					</div>
				)}
				{gameState === GAME_STATE.END_GAME && (
					<div className="card-container">
						<EndGame changeState={newState => this.changeState(newState)} results={results} />
					</div>
				)}
			</div>
		);
	}
}

export default App;
