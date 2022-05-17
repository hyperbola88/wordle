import React from 'react';

const Row = ({guess, currentGuess}) => { //деструктурируем

   if(guess) { //если в этой строке прежняя догадка
      return (
         <div className='row past'>
            {guess.map((letter, index) => (
               <div key={index} className={letter.color}>{letter.key}</div> //формируем массив букв, из каждой буквы строим элемент с классом-цветом
            ))}
         </div>
      )
   }

   if(currentGuess) { //если в этой строке текущ догадка
      let letters = currentGuess.split(''); //строим массив из букв

      return (
         <div className='row current'>
            {letters.map((letter, index) => { //заполняем буквы
              return ( <div key={index} className="filled">{letter}</div>) //тут вписываем буквы в текущ слове в реал времени, класс филлд добавляет анимацию
            })}
            {[...Array(5 - letters.length)].map((_, index) => { //если букв пока меньше 5 то рисуем пустой квадратик
               return (
               <div key={index}></div>
            )
               })}
         </div>
      )
   }
  return ( //если еще нет догадок - пустые строки
    <div className='row'>
       <div></div>
       <div></div>
       <div></div>
       <div></div>
       <div></div>
    </div>
  )
}

export default Row;