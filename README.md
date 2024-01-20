# React Wordle
> A React-based desktop web app

> Live demo at https://react-wordle-hyperbola88.web.app

## General Information
- Try to guess 5-letter word in Russian in 6 attempts!


## Technologies Used
- JavaScript 
- CSS
- React 
- Redux to manage data through all components
- Firebase Realtime Database to store solutuions list


## Game process algorythm:
- the solution is fetched from the database and saved as an array of letters
- entering words:
  - user enters a letter & a square is filled with that letter
  - when a user hits delete it deletes the previous letter
  - when a user hits enter it submits the word
    - if all squares are not filled with letters then the word is not submitted
    - if that word has already been used in a prev guess then the word is not submitted
- checking submitted words:
  - each letter is checked to see if it matches the solution
  - each letter is assigned a color based on it's inclusion in the solution
    - exact matches (correct position in the solution) are green
    - partial matches (in the solution but not the correct position) are yellow
    - none-matches (not in the solution at all) are grey
  - the guess is added to the grid with the correct colors
  - the current guess moves to the next row
  - the keypad letters are updated (colors)
- ending the game:
  - when the guessed word fully matches the solution
    - modal to say 'well done'
  - when the user runs out of guesses
    - modal to say 'unlucky'
      
## Setup
No setup needed! 

## Usage
It is a fun project to work on React and Redux skills! 

## Project Status
Project is: _in progress_ /
Working on mobile version

## Contact
Feel free to contact me!





