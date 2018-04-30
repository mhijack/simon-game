# simon-game

# Plan

  render 4 buttons (green, red, yellow, blue)

state:
  1. sequence - (after correct input, present same series of button presses but with an additional step)
    * first show sequence then accept user input
  2. stepCount - (used to compare user input with corresponding color in sequence)
    * when user input, compare with sequence at current index
    * set index
  3. 