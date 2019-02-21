import React from 'react';
import CardList from './CardList';
import shuffle from 'lodash/shuffle';
import bike from '../images/bike.svg';
import star from '../images/star.svg';
import pumpkin from '../images/pumpkins.svg';
import devil from '../images/devil.svg';
import tux from '../images/tux.svg';
import octocat from '../images/octocat.svg';
import football from '../images/football.svg';
import snow from '../images/snowy.svg';
import halfStar from '../images/halfStar.svg';
import cat from '../images/cat.jpg';

const cards = [
	{ img: bike, name: 'bike', match: false, isTurned: false },
	{ img: star, name: 'star', match: false, isTurned: false },
	{ img: pumpkin, name: 'pumpkin', match: false, isTurned: false },
	{ img: devil, name: 'devil', match: false, isTurned: false },
	{ img: tux, name: 'tux', match: false, isTurned: false },
	{ img: octocat, name: 'octocat', match: false, isTurned: false },
	{ img: football, name: 'football', match: false, isTurned: false },
	{ img: snow, name: 'snow', match: false, isTurned: false },
	{ img: halfStar, name: 'half star', match: false, isTurned: false },
	{ img: cat, name: 'cat', match: false, isTurned: false }
];

class CardGame extends React.Component {
	state = {
		cards: newGame(this.props.mode),
		position: 'CHECK_MATCH',
		prevCard: null,
		uname: null,
		timer: null,
		counter: 0
	};

	componentDidMount() {
		let timer = setInterval(this.tick, 1000);
		this.setState({ timer });
	}

	tick = () => {
		this.setState({
			counter: this.state.counter + 1
		});
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
			this.props.updateResults(this.state.counter);
			this.props.changeState({ gameState: 'END_GAME' });
		}
	}
	componentWillUnmount() {
		clearInterval(this.state.timer);
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
				<div>
					<CardList
						cards={cards}
						checkmatch={card => {
							this.checkmatch(card);
						}}
					/>
				</div>
				<p className="timer">Time:{this.state.counter}</p>
			</div>
		);
	}
}

function newGame(mode) {
	const cardList = shuffle(
		[]
			.concat(
				cards.map(c => {
					return { ...c, uname: `${c.img}-1` };
				})
			)
			.slice(0, mode)
	);

	return shuffle(
		cardList.concat(
			cardList.map(c => {
				return { ...c, uname: `${c.img}-2` };
			})
		)
	);
}

// function resetTimer() {
// 	return new Date();
// }
export default CardGame;
