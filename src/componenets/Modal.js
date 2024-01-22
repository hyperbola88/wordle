import React from "react";

const Modal = ({ isCorrect, solution, turn, changeAgain }) => {

  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>You won!</h1>
          <p className="solution">Answer is: {solution}</p>
          <p>You've guessed in {turn} tries!</p>
          <button onClick={changeAgain}>Play again!</button>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>Oops!</h1>
          <p>The answer is: {solution}</p>
          <p>Wanna try again?</p>
          <button onClick={changeAgain}>Play again!</button>
        </div>
      )}
    </div>
  );
};

export default Modal;
