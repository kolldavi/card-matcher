import React, { Component } from "react";
import "./styles/App.css";
import CardList from "./components/CardList";
import shuffle from "lodash/shuffle";
const cards = [
  { img: "img1", name: 1, match: false, isTurned: false },
  { img: "img2", name: 2, match: false, isTurned: false },
  { img: "img3", name: 3, match: false, isTurned: false },
  { img: "img4", name: 4, match: false, isTurned: false },
  { img: "img5", name: 5, match: false, isTurned: false },
  { img: "img6", name: 6, match: false, isTurned: false },
  { img: "img7", name: 7, match: false, isTurned: false },
  { img: "img8", name: 8, match: false, isTurned: false },
  { img: "img9", name: 9, match: false, isTurned: false },
  { img: "img10", name: 10, match: false, isTurned: false }
];
class App extends Component {
  state = { cards: this.newGame(), checkmatch: false, prevCard: {} };

  checkmatch = card => {
    console.log("card", card);
    this.updateCheckmatch();
    this.updateCard(card);

    //  console.log("state", this.state);
  };

  updateCard = card => {
    if (this.state.checkmatch) {
      console.log("prevCard", this.state.prevCard.card.img);
      if (this.state.prevCard.card.img === card.img) {
        this.setState(prev => {
          let temp = prev.cards.map(c => {
            if (c.img === card.img) {
              c.isTurned = card.isTurned;
              c.match = true;
            }

            return c;
          });
          return { cards: temp, prevCard: {} };
        });
      } else {
        console.log("state2", this.state);
        this.setState(prev => {
          let temp = prev.cards.map(c => {
            if (
              c.uname === card.uname ||
              c.uname === prev.prevCard.card.uname
            ) {
              c.isTurned = false;
            }

            return c;
          });
          return { cards: temp, prevCard: {} };
        });
      }
    } else {
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
