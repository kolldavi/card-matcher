import React from 'react';

const StartGame = props => {
	console.log('props start', props);

	return (
		<div onClick={() => props.changeState('PLAYING_GAME')}>
			<h1>Start Game</h1>
		</div>
	);
};

export default StartGame;
