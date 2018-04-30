# simon-game

# Plan

  render 4 buttons (green, red, yellow, blue)

state:
  1. sequence - (after correct input, present same series of button presses but with an additional step)
    * first show sequence then accept user input
  2. stepCount - (used to compare user input with corresponding color in sequence)
    * when user input, compare with sequence at current index
    * set index

# TODO

  1. present button presses to follow
  2. if clicked `color !== this.state.sequence[stepCount]`, report error (stepCount incremented by 1 at each click, and reset if everything's okay)