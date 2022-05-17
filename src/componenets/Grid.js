import React from 'react';
import Row from './Row';

function Grid({guesses, currentGuess, turn}) {
  return (
    <div>
       {guesses.map((guess, index) => {
          if (turn === index) { //формируем строку для текущей догадки
            return <Row key={index} currentGuess={currentGuess}/>
          }
          return <Row key={index} guess={guess} /> //формируем строки для предыдущих догадок
         })}
    </div>
  )
};

export default Grid;