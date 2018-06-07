import React, { Component } from 'react';
import './styles/App.css';
import CardList from './components/CardList';
import shuffle from 'lodash/shuffle';
import bike from './images/bike.svg';
import star from './images/star.svg';
import pumpkin from './images/pumpkins.svg';
import devil from './images/social-freebsd-devil.svg';
import tux from './images/social-tux.svg';
import octocat from './images/octocat.svg';
import football from './images/football.svg';
import snow from './images/snowy.svg';
import halfStar from './images/half-star.svg';
import cat from './images/cat.jpg';
import timer from 'react-timer-hoc';

const cards = [
	{ img: bike, name: 'bike', match: false, isTurned: false },
	{ img: star, name: 'star', match: false, isTurned: false },
	{ img: pumpkin, name: 'pumpkin', match: false, isTurned: false },
	{ img: devil, name: 'devil', match: false, isTurned: false },
	{ img: tux, name: 'tux', match: false, isTurned: false }
	// { img: octocat, name: 'octocat', match: false, isTurned: false },
	// { img: football, name: 'football', match: false, isTurned: false },
	// { img: snow, name: 'snow', match: false, isTurned: false },
	// { img: halfStar, name: 'half star', match: false, isTurned: false },
	// { img: cat, name: 'cat', match: false, isTurned: false }
];

function myComponent({ timer }) {
	return <h1> {timer.tick}s</h1>;
}
const Timer1 = timer(1000)(myComponent);
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

class App extends Component {
	state = {
		cards: newGame(),
		position: 'CHECK_MATCH',
		prevCard: null,
		uname: null,
		timer: timer(1000)(myComponent)
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

	updateCheckmatch() {
		this.setState(prev => {
			return { checkmatch: !prev.checkmatch };
		});
	}

	componentDidUpdate() {
		if (this.checkWinner(this.state.cards)) {
			alert('You Won!');
			this.setState(prev => {
				return {
					cards: newGame(),
					position: 'CHECK_MATCH',
					prevCard: null,
					uname: null,
					timer: timer(1000)(myComponent)
				};
			});
		}
	}

	render() {
		const { cards } = this.state;

		return (
			<div className="App">
				<CardList
					cards={cards}
					checkmatch={card => {
						this.checkmatch(card);
					}}
				/>
				<this.state.timer />
			</div>
		);
	}
}

export default App;
