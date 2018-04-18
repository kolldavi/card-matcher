import React, { Component } from "react";
import "../styles/Card.css";
class Card extends Component {
  //img: "img1", key: 1, match: false, isTurned: false

  static defaultProps() {
    return { isTurned: false };
  }
  handleClick = e => {
    e.preventDefault();
    if (this.props.match) return;
    console.log("Card prop", this.props);
    this.props.onClick &&
      this.props.onClick({
        ...this.props,
        isTurned: !this.props.isTurned
      });
  };
  render() {
    return (
      <div className="card" onClick={this.handleClick}>
        {this.props.isTurned ? (
          <h1 className="front">img: {this.props.img}</h1>
        ) : (
          <h1>front {this.props.img}</h1>
        )}
      </div>
    );
  }
}

export default Card;
