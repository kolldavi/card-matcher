import React from 'react';
import CardList from './CardList';

function resetTimer() {
	return new Date();
}
function newGame() {
	const cardList = shuffle(
		[]
			.concat(
				cards.map(c => {
					return { ...c, uname: `${c.img}-1` };
				})
			)
			.slice(0, 10)
	);

	return shuffle(
		cardList.concat(
			cardList.map(c => {
				return { ...c, uname: `${c.img}-2` };
			})
		)
	);
}
class CardGame extends React.Component {
	state = {
		cards: newGame(),
		position: 'CHECK_MATCH',
		prevCard: null,
		uname: null
	};
	checkWinner = cards => {
		return cards.every(card => card.match === true);
	};

	checkmatch = card => {
		this.updateCard(card);
	};

	updateCard = card => {
		if (this.state.position === 'WAIT_FOR_TURN') return;

		if (this.state.position === 'WAIT_FOR_SECOND_CLICK') {
			if (this.state.prevCard === null) {
				this.setState(prev => {
					let temp = prev.cards.map(c => {
						if (c.match === false) {
							c.isTurned = false;
						}
						return c;
					});
					return { cards: temp, position: 'WAIT_FOR_FIRST_CLICK' };
				});
				return;
			}
			if (
				this.state.prevCard.card &&
				this.state.prevCard.card.name === card.name &&
				this.state.prevCard.card.uname !== card.uname
			) {
				this.updateStateMatch(card);
			} else {
				this.updateStateNoMatch(card);
			}
		} else {
			//turn card if not checking for match
			this.setState(prev => {
				let temp = prev.cards.map(c => {
					if (c.uname === card.uname) {
						c.isTurned = card.isTurned;
					}
					return c;
				});
				return {
					cards: temp,
					prevCard: { card },
					position: 'WAIT_FOR_SECOND_CLICK'
				};
			});
		}
	};

	updateStateNoMatch(card) {
		//if click same card just turned
		if (this.state.prevCard.card && card.uname === this.state.prevCard.card.uname) {
			this.updateCheckmatch();
			return;
		}
		//turn cards to over
		this.setState(prev => {
			let temp = prev.cards.map(c => {
				if ((c.uname && c.uname === card.uname) || c.uname === card.uname) {
					c.isTurned = true;
				}
				return c;
			});
			return { cards: temp, position: 'WAIT_FOR_TURN' };
		});

		setTimeout(() => {
			this.setState(prev => {
				let temp = prev.cards.map(c => {
					console.log('prev', prev);
					console.log('c', c);
					if (
						Object.getOwnPropertyNames(prev.prevCard).length === 0 ||
						c.uname === card.uname ||
						c.uname === prev.prevCard.card.uname
					) {
						c.isTurned = false;
					}
					return c;
				});
				return {
					cards: temp,
					prevCard: null,
					position: 'WAIT_FOR_FIRST_CLICK'
				};
			});
		}, 700);
	}

	updateStateMatch(card) {
		this.setState(prev => {
			let temp = prev.cards.map(c => {
				if (c.name === card.name) {
					c.isTurned = card.isTurned;
					c.match = true;
				}
				return c;
			});
			return { cards: temp, prevCard: {}, position: 'WAIT_FOR_FIRST_CLICK' };
		});
	}
	componentDidUpdate() {
		if (this.checkWinner(this.state.cards)) {
			console.log(`You Won! with a time of ${this.state.counter} seconds`);
			this.setState(prev => {
				return {
					cards: newGame(),
					position: 'CHECK_MATCH',
					prevCard: null,
					uname: null,
					counter: 0,
					timer: resetTimer()
				};
			});
		}
	}
	updateCheckmatch() {
		this.setState(prev => {
			return { checkmatch: !prev.checkmatch };
		});
	}

	render() {
		const { cards } = this.state;
		return (
			<div className="App">
				<div className="card-container">
					<CardList
						cards={cards}
						checkmatch={card => {
							this.checkmatch(card);
						}}
					/>
					<CardGame cards={cards} />
				</div>
				<p>{this.state.counter}</p>
			</div>
		);
	}
}

export default CardGame;
