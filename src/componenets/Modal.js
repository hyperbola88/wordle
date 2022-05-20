import React from "react";

const Modal = ({ isCorrect, solution, turn, changeAgain }) => {
   //const changePage = () => {
     // document.location.reload(true);
   //}

  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>Верно!</h1>
          <p className="solution">Ответ: {solution}</p>
          <p>Вы угадали с {turn} попыток!</p>
          <button onClick={changeAgain}>Еще раз!</button>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>Упс!</h1>
          <p>Правильный ответ: {solution}</p>
          <p>Сыграть еще раз?</p>
          <button onClick={changeAgain}>Еще раз!</button>
        </div>
      )}
    </div>
  );
};

export default Modal;
