import React, { useEffect, useState } from "react";

const Keypad = ({usedKeys}) => {
  const [letters, setLetters] = useState(null);

  useEffect(() => {
    fetch("https://wordle-50aea-default-rtdb.firebaseio.com/letters.json")
      .then((res) => res.json())
      .then((json) => {
        setLetters(json);
      });
  }, []); //будет запускаться при рендеринге компонента

  return (
     <div className="keypad">
        {letters && letters.map(letter => { 
           const color = usedKeys[letter.key];
           return (
              <div key={letter.key} className={color}>{letter.key}</div>
           )
        })}
     </div>
  );
};

export default Keypad;
