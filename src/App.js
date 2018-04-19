import React, { Component } from "react";
import "./styles/App.css";
import CardList from "./components/CardList";
import shuffle from "lodash/shuffle";
import bike from "./images/bike.svg";
import star from "./images/star.svg";
import pumpkin from "./images/pumpkins.svg";
import devil from "./images/social-freebsd-devil.svg";
import tux from "./images/social-tux.svg";
import octocat from "./images/octocat.svg";
import football from "./images/football.svg";
import snow from "./images/snowy.svg";
import halfStar from "./images/half-star.svg";
import cat from "./images/cat.jpg";
const cards = [
  { img: bike, name: "bike", match: false, isTurned: false },
  { img: star, name: "star", match: false, isTurned: false },
  { img: pumpkin, name: "pumpkin", match: false, isTurned: false },
  {
    img: devil,
    name: "devil",
    match: false,
    isTurned: false
  },
  { img: tux, name: "tux", match: false, isTurned: false },
  { img: octocat, name: "octocat", match: false, isTurned: false },
  { img: football, name: "football", match: false, isTurned: false },
  { img: snow, name: "snow", match: false, isTurned: false },
  { img: halfStar, name: "half star", match: false, isTurned: false },
  { img: cat, name: "cat", match: false, isTurned: false }
];
class App extends Component {
  state = { cards: this.newGame(), checkmatch: false, prevCard: {} };

  checkmatch = card => {
    this.updateCheckmatch();
    this.updateCard(card);
  };

  updateCard = card => {
    if (this.state.checkmatch) {
      if (
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
        return { cards: temp, prevCard: { card } };
      });
    }
  };
  updateStateNoMatch(card) {
    //if click same card just turned
    if (card.uname === this.state.prevCard.card.uname) {
      this.updateCheckmatch();
      return;
    }
    //turn cards to over
    this.setState(prev => {
      let temp = prev.cards.map(c => {
        if (c.uname === card.uname || c.uname === prev.prevCard.card.uname) {
          c.isTurned = true;
        }
        return c;
      });
      return { cards: temp };
    });

    setTimeout(() => {
      this.setState(prev => {
        console.log("in");
        let temp = prev.cards.map(c => {
          if (c.uname === card.uname || c.uname === prev.prevCard.card.uname) {
            c.isTurned = false;
          }
          return c;
        });
        return { cards: temp, prevCard: {} };
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
      return { cards: temp, prevCard: {} };
    });
  }

  updateCheckmatch() {
    this.setState(prev => {
      return { checkmatch: !prev.checkmatch };
    });
  }

  newGame() {
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
      </div>
    );
  }
}

export default App;
