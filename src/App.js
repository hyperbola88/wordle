import { useCallback, useEffect, useState } from "react";
import Wordle from "./componenets/Wordle";

function App() {
  const [solution, setSolution] = useState(null);
  const [again, setAgain] = useState(false);

  const changeAgain = useCallback(() => {
      setAgain(true);
      fetch("https://wordle-50aea-default-rtdb.firebaseio.com/solutions.json")
        .then((res) => res.json())
        .then((json) => {
          const randomSolution = json[Math.floor(Math.random() * json.length)];
          setSolution(randomSolution.word);
          setAgain(false);
        });
  }, []);

  useEffect(() => {
    fetch("https://wordle-50aea-default-rtdb.firebaseio.com/solutions.json")
      .then((res) => res.json())
      .then((json) => {
        const randomSolution = json[Math.floor(Math.random() * json.length)];
        console.log(randomSolution);
        setSolution(randomSolution.word);
      });
  }, [setSolution]);

  console.log(solution);

  return (
    <div className="App">
      <h1>Guess a 5-letter word!</h1>
      {solution && (
        <Wordle solution={solution} changeAgain={changeAgain} again={again} />
      )}
    </div>
  );
}

export default App;

