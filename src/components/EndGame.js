import React from 'react';

const EndGame = props => {
	return (
		<div onClick={() => props.changeState('START_GAME')}>
			<h1>You Win</h1>
			<h3>It took you {props.results} seconds</h3>
		</div>
	);
};

export default EndGame;
