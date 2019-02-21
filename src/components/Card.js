import React from 'react';
import '../styles/Card.css';

const Card = props => {
	//img: "img1", key: 1, match: false, isTurned: false
	const done = props.match ? 'done' : '';
	const flip = props.isTurned ? 'flip' : 'front';
	const handleClick = e => {
		e.preventDefault();
		if (props.match) return;
		props.onClick &&
			props.onClick({
				...props,
				isTurned: !props.isTurned
			});
	};
	return (
		<div className={`card ${done} ${flip}`} onClick={handleClick}>
			{props.isTurned ? <img className="card-image" src={props.img} alt={props.name} /> : ''}
		</div>
	);
};

export default Card;
