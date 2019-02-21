import React from 'react';

const StartGame = props => {
	return (
		<div>
			<h1>Choose Difficulty</h1>
			<button onClick={() => props.changeState({ gameState: 'PLAYING_GAME', mode: 2 })}>Easy</button>
			<button onClick={() => props.changeState({ gameState: 'PLAYING_GAME', mode: 6 })}>Medium</button>
			<button onClick={() => props.changeState({ gameState: 'PLAYING_GAME', mode: 10 })}>Hard</button>
		</div>
	);
};

export default StartGame;
