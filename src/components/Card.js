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
    this.props.onClick &&
      this.props.onClick({
        ...this.props,
        isTurned: !this.props.isTurned
      });
  };
  render() {
    const done = this.props.match ? "done" : "";
    const flip = this.props.isTurned ? "flip" : "";
    return (
      <div className={`card ${done} ${flip}`} onClick={this.handleClick}>
        {this.props.isTurned ? (
          <img
            className="card-image"
            src={this.props.img}
            alt={this.props.name}
          />
        ) : (
          <h1>Front: {this.props.name}</h1>
        )}
      </div>
    );
  }
}

export default Card;
