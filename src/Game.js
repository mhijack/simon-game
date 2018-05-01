import React, { Component } from 'react';
import './Game.css';

// # TODO

//  1. ! present button presses to follow
//  2. ! if clicked `color !== this.state.sequence[stepCount]`, report error (stepCount incremented by 1 at each click, and reset if everything's okay)
//  3. ! when color button is clicked, 1 play sound 2 log color

const GREEN = '#00a74a';
const RED = '#9f0f17';
const YELLOW = '#cca707';
const BLUE = '#094a8f';
const COLORARR = [GREEN, RED, YELLOW, BLUE];
const SOUND1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
const SOUND2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
const SOUND3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
const SOUND4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
const SOUNDS = [SOUND1, SOUND2, SOUND3, SOUND4];

const Button = props => {
	return (
		<button
			className="color"
			style={{ backgroundColor: props.color, width: '88px', height: '88px', color: 'white' }}
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
			sequence: [RED, BLUE, YELLOW],
			stepCount: 0,
			buttonClickable: false
		};
	}

	// light up each button in sequence & play sound
	lightUp = () => {
		const colors = this.state.colors;
		let sequence = this.state.sequence;
		let count = 0;

		const interval = setInterval(() => {
			let colorIndex = colors.indexOf(sequence[count]);
			console.log(colorIndex);
			// play sound
			SOUNDS[colorIndex].load();
			SOUNDS[colorIndex].play();
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
				console.log('interval cleared');
			}
		}, 1200);
	};

	// when click 'start' button, display sequence & set button to clickable once finished
	startGame = () => {
    this.setState({ stepCount: 0})
		this.lightUp();
		// wait until lightup finished then make button clickable
		setTimeout(() => {
			this.setState({ buttonClickable: true });
		}, 1200 * this.state.sequence.length + 500);
	};

	handleColorMouseDown = (color, index) => {
		// color is color of the button
		// index to play sound

		// .load() fixes problem of audio playing only once
		SOUNDS[index].load();
		SOUNDS[index].play();
		console.log(color);
		if (color === this.state.sequence[this.state.stepCount]) {
			// if correct, continue checking next input
			console.log('correct');
		} else {
			// otherwise, reset game // TODO - reset game
			console.log('wrong');
		}

		// check if last color in sequence. if so, restart game // TODO - start game with one additional color in sequence
		const newStepCount = this.state.stepCount + 1;
		if (newStepCount === this.state.sequence.length) {
			// if at last sequence, 1 reset stepCount, 2 add a new color to sequence, and 3 call start() to restart game
			const sequence = this.state.sequence;
			sequence.push(generateNextColor(COLORARR));
			console.log(sequence);
			this.setState(
				prevState => {
          return {
            stepCount: 0,
            sequence: sequence,
            buttonClickable: false
          }
        }
			);
      this.startGame();
      return;
		}
		this.setState({ stepCount: newStepCount });
	};

	render() {
		const buttons = this.state.colors.map((buttonColor, index) => {
			return (
				<Button
					style={{ backgroundColor: buttonColor, width: '40px', height: '40px' }}
					color={buttonColor}
					key={index}
					onMouseDown={() => this.handleColorMouseDown(buttonColor, index)}
					clickable={this.state.buttonClickable}
					index={index}
				/>
			);
		});
		return (
			<div>
				{buttons}
				<button onClick={this.startGame}>Start</button>
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
