import React, { Component } from 'react';
import './Game.css';

// # TODO

//  1. ! present button presses to follow
//  2. ! if clicked `color !== this.state.sequence[stepCount]`, report error (stepCount incremented by 1 at each click, and reset if everything's okay)
//  3. ! when color button is clicked, 1 play sound 2 log color
//  4. ! if pressed wrong button, restart series (with same sequence)
//  5. ! start game with one additional color in sequence

const GREEN = '#7cbb00';
const RED = '#f65314';
const YELLOW = '#ffbb00';
const BLUE = '#00a1f1';
const COLORARR = [GREEN, RED, YELLOW, BLUE];
const SOUND1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
const SOUND2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
const SOUND3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
const SOUND4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
const SOUNDS = [SOUND1, SOUND2, SOUND3, SOUND4];

const Button = props => {
	return (
		<button
      className={props.className}
			style={{ backgroundColor: props.color, width: '150px', height: '150px', color: 'white' }}
			onMouseDown={props.onMouseDown}
			disabled={!props.clickable}
			id={props.index}
		/>
	);
};

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			colors: COLORARR,
			sequence: [],
			stepCount: 0,
			buttonClickable: false,
      intervalKey: null,
      gameStarted: false
		};
	}

	// present user with random button presses
	lightUp = () => {
		const colors = this.state.colors;
		let sequence = this.state.sequence;
		let count = 0;

		const interval = setInterval(() => {
			let colorIndex = colors.indexOf(sequence[count]);
			// play sound
			playSoundAtIndex(colorIndex);
			// retrieve button to add 'lightup' class
			let button = document.getElementById(colorIndex);
			button.classList.add('lightup');
			// wait 800ms to remove 'lightup' class
			setTimeout(() => {
				button.classList.remove('lightup');
			}, 800);
			count += 1;
			if (count >= sequence.length) {
				clearInterval(interval);
				console.log('lightup interval cleared');
			}
		}, 1200);
		// set intervalKey for clearing setInterval when click wrong button
		this.setState({ intervalKey: interval });
	};

	// when click 'start' button, display sequence & set button to clickable once finished
	startGame = addNewColor => {
    this.setState({
      gameStarted: true
    })
		if (addNewColor) {
			// at beginning of each round, push one random color to sequence
			const sequence = this.state.sequence;
			sequence.push(generateNextColor(COLORARR));
			this.setState({ sequence });
			console.log('added');
		}
		// play sequence
		this.lightUp();
		// wait until lightup finished then make button clickable
		setTimeout(() => {
			this.setState({ buttonClickable: true });
		}, 1200 * this.state.sequence.length + 500);
	};

	restartSequence = () => {
		// 1 clear interval using this.state.intervalKey
		// 2 wait 500ms to restart game // TODO - flash indicator to indicate wrong input
		clearInterval(this.state.intervalKey);
		this.setState({
			buttonClickable: false,
			intervalKey: null,
			stepCount: 0
		});
		this.startGame(false);
	};

	handleColorMouseDown = (color, index) => {
		// color is color of the button
		// index to play sound
		const stepCount = this.state.stepCount;
		const sequence = this.state.sequence;
		// .load() fixes problem of audio playing only once
		playSoundAtIndex(index);
		if (color !== sequence[stepCount]) {
			// if clicked on wrong color, reset game // TODO - reset game
			this.restartSequence();
			return;
		}

		// check if last color in sequence. if so, restart game
		const newStepCount = stepCount + 1;
		if (newStepCount === sequence.length) {
			setTimeout(() => {
				// if at last sequence, 1 reset stepCount, 2 add a new color to sequence, and 3 call start() to restart game
				this.setState(prevState => {
					return {
						stepCount: 0,
						buttonClickable: false
					};
				});
				this.startGame(true);
			}, 1000);
			return;
		}
		this.setState({ stepCount: newStepCount });
	};

	render() {
		const buttons = this.state.colors.map((buttonColor, index) => {
			return (
				<Button
					style={{ backgroundColor: buttonColor, width: '40px', height: '40px' }}
					className={'colorBtn ' + 'color' + index}
					color={buttonColor}
					key={index}
					onMouseDown={() => this.handleColorMouseDown(buttonColor, index)}
					clickable={this.state.buttonClickable}
					index={index}
				/>
			);
		});
		return (
			<div className="container">
				<div className="sidebar">
					<h1>Windows Square</h1>
					<h3>High Score: 0</h3>
					<h3>
						Current Round: <span className="currentRound">{this.state.sequence.length}</span>
					</h3>
					<h3>
						Strict<span>✔</span>
					</h3>
					<button className="gameBtn" onClick={this.startGame} disabled={this.state.gameStarted} style={this.state.gameStarted ? { opacity: '0.5' } : null}>
						Start Game
					</button>
					<button className="gameBtn" onClick={this.endGame}>
						End Game
					</button>
				</div>
				<div className="game">{buttons}</div>
			</div>
		);
	}
}

export default Game;

// ================== helpers ==================
// generates a random color inside COLORARR
function generateNextColor(colors) {
	return colors[Math.floor(Math.random(colors.length) * 4)];
}

// play audio
function playSoundAtIndex(index) {
	SOUNDS[index].load();
	SOUNDS[index].play();
}
