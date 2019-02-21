import React from 'react';

const StartGame = props => {
	return (
		<div onClick={() => props.changeState('PLAYING_GAME')}>
			<h1>Start Game</h1>
		</div>
	);
};

export default StartGame;
