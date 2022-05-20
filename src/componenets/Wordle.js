import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";
import Warning from "./Warning";

function Wordle({ solution, changeAgain, again }) {
  //сразу вытащили из пропса так тока солюшн
  const { currentGuess, handleKeyup, guesses, turn, isCorrect, usedKeys, reload, warning, removeWarning } =
    useWordle(solution);
  const [showModal, setShowModal] = useState(false);
  

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if (isCorrect && !again) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    if (turn > 5 && !again) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    return () => window.removeEventListener("keyup", handleKeyup); //клинап Ф чтоб новые события не запускали Ф пока предыдущая не завершилась, а то луп
    
  }, [handleKeyup, isCorrect, turn, again]);

  useEffect(() => {
   if(again) {
      setShowModal(false);
      reload();
      console.log("reloaded");
   }
  }, [again, reload]);

  console.log(solution);


  return (
    <div>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      {showModal && !again && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} changeAgain={changeAgain}/>
      )}
      {warning && <Warning removeWarning={removeWarning} warning={warning}/>}
    </div>
  );
}

export default Wordle;
