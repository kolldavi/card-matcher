import React, { Component } from 'react';
import './styles/App.css';
import CardGame from './components/CardGame';

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="card-container">
					<CardGame />
				</div>
			</div>
		);
	}
}

export default App;
