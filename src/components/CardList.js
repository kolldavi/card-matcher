import React, { Component } from 'react';
import Card from './Card';
import '../styles/CardList.css';
class CardList extends Component {
	render() {
		const { cards, checkmatch } = this.props;

		return (
			<div className="card-list">
				{Array.isArray(cards) ? (
					cards.map((card, index) => (
						<Card
							key={`${card.img}-${index}`}
							index={index}
							onClick={checkmatch}
							img={card.img}
							{...card}
						/>
					))
				) : (
					<h1>no Cards</h1>
				)}
			</div>
		);
	}
}

export default CardList;
