import { useCallback, useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0); //следим за кол-вом попытками
  const [currentGuess, setCurrentGuess] = useState(""); //пустая строка, обновляем по кажд клавише
  const [guesses, setGuesses] = useState([...Array(6)]); // следим за всеми догадгами, их в массив
  const [history, setHistory] = useState([]); // тут догадки сохраняем стрингами, чтоб сверять нет ли повторок
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({}); //Объект формата {a: "grey", b: "green"}
  const [warning, setWarning] = useState(null);

  //2)догадку - в массив
  const formatGuess = () => {
    let solutionArray = [...solution]; //сохраняем разгадку как массив букв
    let formattedGuess = [...currentGuess].map((letter) => {
      //из массива букв догадки делаем массив О-тов на кажд букву, цвет пока всем серый
      return { key: letter, color: "grey" };
    });

    //теперь проверяем надо ли поменять цвет в О-тах-буквах
    //сначала ищем зеленые
    formattedGuess.forEach((letter, index) => {
      if (solution[index] === letter.key) {
        formattedGuess[index].color = "green";
        solutionArray[index] = null; //меняем эначение буквы в массиве разгадки чтоб повторно с этой буквой не сравнивалось в след цикле
      }
    });

    //теперь ищем желтые буквы
    formattedGuess.forEach((letter, index) => {
      if (solutionArray.includes(letter.key) && letter.color !== "green") {
        //если есть такая буква и незеленая
        formattedGuess[index].color = "yellow"; //то меняем цвет на желтый
        solutionArray[solutionArray.indexOf(letter.key)] = null; //опять убираем такую же букву из массива разгадки чтоб повторно не сравнивалось в след цикле
      }
    });
    return formattedGuess;
  };

  //3)добавить новую догадку к стейту догадок и обновить прочие стейты
  const addNewGuess = (formattedGuess) => {
   //обновить стейт isCorrect если догадка верная
    if (currentGuess === solution) {
      setIsCorrect(true);
    };

    //тут сохраняем все догадки как массив О-тов (в О-тах сохраняется данные о цветах каждой буквы в каждой догадке)
   setGuesses(prev => {
      let newGuesses = [...prev];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
   }) 

    //тут сохраняем все догадки в форме массива стрингов
    setHistory((prev) => [...prev, currentGuess]);

    //помнять число попыток в стейте попыток
    setTurn(prev => prev + 1);

   //назначаем цвета буквам клавиатуры
    setUsedKeys(prevUsedKeys => {
       formattedGuess.forEach(letter => {
          const currentColor = prevUsedKeys[letter.key];

          if(letter.color === 'green') {
             prevUsedKeys[letter.key] = 'green';
             return;
          }
          if(letter.color === 'yellow' && currentColor !=='green') {
             prevUsedKeys[letter.key] = 'yellow';
             return;
          }
          if (letter.color === 'grey' && currentColor !== ('green' || 'yellow')) {
             prevUsedKeys[letter.key] = 'grey';
             return;
          }
       })
       return prevUsedKeys;
    })

    setCurrentGuess(""); //очищаем для новой догадки
  };

  //1)следим за ивентом keyUp
  //если юзер нажимает Энтер добавляем и процессим новую догадку
  const handleKeyup = ({ key }) => {
    //деструктурируем только параметр ки из О-ивента
    if (key === "Enter") {
      //при отправке догадке
      //только если число попыток меньше 5
      //и если слово не повторяется
      //и слово длиной 5 букв
      if (turn > 5) {
        return;
      }
      if (history.includes(currentGuess)) {
        setWarning("You've already tried this word");
        setCurrentGuess('');
        return;
      }
      if (currentGuess.length !== 5) {
        setWarning("The word must be 5 letters long!")
        return;
      }
      const formatted = formatGuess(); //если прошли то можно сохранять догадку после Энтера
      addNewGuess(formatted); //сохраняем отформатированную догадку
    }

    if (key === "Backspace") {
      //если юзер стирает букву
      setCurrentGuess((prev) => {
        return prev.slice(0, -1); //то удаляем последнюю букву
      });
      return; //выходим потому что если был бэкспейс то дальнейшая проверка не нужна
    }
    if (/^[A-Za-z]$/.test(key)) {
      //проверяем является ли нажатая клавиша буквой тогда тру
      if (currentGuess.length < 5) {
        //проверяем количество уже набранных букв
        setCurrentGuess((prevState) => prevState + key);
      }
    }
  };

  const reload = useCallback(() => {
     setTurn(0);
     setCurrentGuess('');
     setGuesses([...Array(6)]);
     setIsCorrect(false);
     setUsedKeys({});
     setHistory([]);
  }, []);

  const removeWarning = useCallback(() => {
     setWarning(null);
  }, []);

  return { turn, currentGuess, guesses, isCorrect, handleKeyup, usedKeys, reload, warning, removeWarning }; //возвращаем нужное другим компонентам
};

export default useWordle;
