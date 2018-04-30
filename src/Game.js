import React, { Component } from 'react';
import './Game.css';

// # TODO

//  1. present button presses to follow
//  2. if clicked `color !== this.state.sequence[stepCount]`, report error (stepCount incremented by 1 at each click, and reset if everything's okay)
//  3. when color button is clicked, 1 play sound 2 log color

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
			onClick={props.onClick}
		/>
	);
};

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
      colors: COLORARR,
      sequence: [RED, BLUE],
      stepCount: 0
		};
	}

	handleColorClick = (color, index) => {
		// color === color of button
		// index to play sound

		// .load() fix problem of audio playing only once
		SOUNDS[index].load();
    SOUNDS[index].play();
    console.log(color)
    if (color === this.state.sequence[this.state.stepCount]) {
      // if correct, continue checking next input
      console.log('correct');
    } else {
      // otherwise, reset game // TODO - reset game
      console.log('wrong')
    }
    this.setState(prevState => prevState.stepCount += 1)
	};

	render() {
		const buttons = this.state.colors.map((buttonColor, index) => {
			return (
				<Button
					style={{ backgroundColor: buttonColor, width: '40px', height: '40px' }}
					color={buttonColor}
					key={index}
					onClick={() => this.handleColorClick(buttonColor, index)}
				/>
			);
		});

		return <div>{buttons}</div>;
	}
}

export default Game;

// ================== helpers ==================
// generates a random color inside COLORARR
function generateNextColor(colors) {
  return colors[Math.floor(Math.random(colors.length) * 4)];
}