# simon-game

  '**Windows Square**' clone of the classic Simon Game, as a tribute to Microsoft Windows' color scheme.

  A working demo of this game is available via [codepen](https://codepen.io/mhijack/full/YLxPvq/).

  ![Windows Square](./pictures/gameOver-screenshot.png?raw=true "Windows Square")

# Features
  * User is presented with a random series of button presses
  * Each time user inputs a series button presses correctly, be presented with the same series of button presses but with an additional step
    * Hear a sound corresponding to each button both when **the series of button presses play**, and **when user presses a button**
  * If press the wrong button, user is notified of that and that series of button presses starts again so user can try again
  * User can see how many steps are in the current series of button presses
  * User can end the current game session at any time and start over
  * **Strict Mode:** game session will reset once the user presses the wrong button (current step go down to 0)
  * User can win the game by getting a series of 20 steps correct
  * **Fits both large and small screens (break point at 845px)**