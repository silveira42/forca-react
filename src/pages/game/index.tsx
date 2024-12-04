import React from "react";
import { useGameContext } from "../../GameContext";
import Hangman from "../../components/hangman";

type GameProps = {
  word: string;
}

export default function Game(props: GameProps) {
  const { game } = useGameContext();
  const [ currentLetter, setCurrentLetter ] = React.useState('');
  const [ displayedWord, setDisplayedWord ] = React.useState(props.word.split('').map(() => ' _ '));
  const [ wrongLetters, setWrongLetters ] = React.useState<string[]>([]);

  const checkLetter = (letter: string) => {
    setCurrentLetter('');
    if (props.word.includes(letter)) {
      const newDisplayedWord = [...displayedWord];
      newDisplayedWord.forEach((char, index) => {
        if (props.word[index] === letter) {
          newDisplayedWord[index] = letter;
        }
      });
      setDisplayedWord(newDisplayedWord);
      if (!newDisplayedWord.includes(' _ ')) {
        alert('You won!');
        game.resetGame();
      }
    } else {
      if (wrongLetters.length >= 5) {
        alert('You lost!');
        game.resetGame();
      } else {
        setWrongLetters([...wrongLetters, letter]);
      }
    }
  }

  return (
    <div>
      <div>
        <h2>Type the next letter!</h2>
        <input
          disabled={currentLetter.length > 0}
          type="text"
          value={currentLetter}
          onChange={(e) => setCurrentLetter(e.target.value.toLowerCase())}
        />
        <button onClick={() => setCurrentLetter('')}>Clear</button>
        <button onClick={() => checkLetter(currentLetter)}>Check</button>
      </div>
      <div>
        <h2>{
          displayedWord
        }</h2>
      </div>
      <div>
        <Hangman wrongGuesses={wrongLetters.length} />
      </div>
      <div>
        <h2>Wrong letters:</h2>
        <h3>{
          wrongLetters.join(', ')
        }</h3>
      </div>
    </div>
  );
}
