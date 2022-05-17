import React from "react";

const Modal = ({ isCorrect, solution, turn, changeAgain }) => {
   //const changePage = () => {
     // document.location.reload(true);
   //}

  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>Correct!</h1>
          <p className="solution">Solution: {solution}</p>
          <p>You won in {turn} guesses</p>
          <button onClick={changeAgain}>Play again!</button>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>Oooops!</h1>
          <p>Solution was: {solution}</p>
          <p>Try again!</p>
          <button onClick={changeAgain}>Play again!</button>
        </div>
      )}
    </div>
  );
};

export default Modal;
