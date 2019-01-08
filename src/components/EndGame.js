import React from 'react';

const EndGame = props => {
	console.log(props.results);
	return (
		<div onClick={() => props.changeState('START_GAME')}>
			<h1>End Game</h1>
			<h3>{props.results}'s</h3>
		</div>
	);
};

export default EndGame;
