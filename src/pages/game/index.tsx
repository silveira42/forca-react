import React from 'react';
import { useGameContext } from '../../GameContext';
import Hangman from '../../components/hangman';
import LetterInput from '../../components/letterInput';
import './styles.css';

export default function Game() {
	const { game } = useGameContext();

	const [displayedWord, setDisplayedWord] = React.useState(
		game.word.split('').map(() => ' _ ')
	);
	const [wrongLetters, setWrongLetters] = React.useState<string[]>([]);

	const checkLetter = (letter: string) => {
		if (game.word.includes(letter)) {
			markRightLetter(letter);
		} else {
			markWrongLetter(letter);
		}
	};

	const markRightLetter = (letter: string) => {
		const newDisplayedWord = [...displayedWord];
		newDisplayedWord.forEach((char, index) => {
			if (game.word[index] === letter) {
				newDisplayedWord[index] = letter;
			}
		});
		setDisplayedWord(newDisplayedWord);
		if (!newDisplayedWord.includes(' _ ')) {
			alert('You won!');
			game.resetGame();
		}
	};

	const markWrongLetter = (letter: string) => {
		if (wrongLetters.length >= 5) {
			alert('You lost! The word was: ' + game.word);
			game.resetGame();
		} else {
			setWrongLetters([...wrongLetters, letter]);
		}
	};

	return (
		<div>
			<div>
				<LetterInput onChoose={checkLetter} />
			</div>
			<div>
				<h2>{displayedWord}</h2>
			</div>
			<div>
				<Hangman wrongGuesses={wrongLetters.length} />
			</div>
			<div>
				<h2>Wrong letters:</h2>
				<h3>{wrongLetters.join(', ')}</h3>
			</div>
		</div>
	);
}
