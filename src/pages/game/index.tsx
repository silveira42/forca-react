import React from 'react';
import { useGameContext } from '../../GameContext';
import Hangman from '../../components/hangman';
import './styles.css';
import { useAppContext } from '../../AppContext';
import LanguageChooser from '../../components/languageChooser';

export default function Game() {
	const { game } = useGameContext();
	const { intl } = useAppContext();
	const dictionary = intl.getDictionary();

	const [displayedWord, setDisplayedWord] = React.useState(
		game.word.split('').map(() => '')
	);
	const [usedLetters, setUsedLetters] = React.useState<string[]>([]);
	const [wrongGuesses, setWrongGuesses] = React.useState(0);

	// Keyboard layout - QWERTY
	const keyboardRows = [
		['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
		['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
		['Z', 'X', 'C', 'V', 'B', 'N', 'M']
	];

	const checkLetter = (letter: string) => {
		const lowerLetter = letter.toLowerCase();
		
		// Don't allow reusing letters
		if (usedLetters.includes(lowerLetter)) {
			return;
		}

		setUsedLetters([...usedLetters, lowerLetter]);

		if (game.word.includes(lowerLetter)) {
			markRightLetter(lowerLetter);
		} else {
			markWrongLetter();
		}
	};

	const markRightLetter = (letter: string) => {
		const newDisplayedWord = [...displayedWord];
		game.word.split('').forEach((char, index) => {
			if (char === letter) {
				newDisplayedWord[index] = letter;
			}
		});
		setDisplayedWord(newDisplayedWord);
		
		// Check if won
		if (newDisplayedWord.every((char, index) => char === game.word[index])) {
			setTimeout(() => {
				alert(dictionary.game.youWin);
				game.resetGame();
			}, 100);
		}
	};

	const markWrongLetter = () => {
		const newWrongGuesses = wrongGuesses + 1;
		setWrongGuesses(newWrongGuesses);
		
		if (newWrongGuesses >= 6) {
			setTimeout(() => {
				alert(dictionary.game.youLose + ' ' + dictionary.game.theWordWas + ': ' + game.word);
				game.resetGame();
			}, 100);
		}
	};

	// Add keyboard event listener for physical keyboard input
	React.useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			const key = event.key.toLowerCase();
			// Check if it's a letter A-Z
			if (/^[a-z]$/.test(key)) {
				checkLetter(key);
			}
		};

		window.addEventListener('keydown', handleKeyPress);
		
		// Cleanup
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [usedLetters, displayedWord, wrongGuesses]); // Re-attach when state changes

	return (
		<div className="game-container">
			{/* Header */}
			<header className="game-header">
				<h1 className="game-title" onClick={game.resetGame}>{dictionary.game.title.toUpperCase()}</h1>
				<LanguageChooser disabled={true} />
			</header>

			{/* Content */}
			<main className="game-content">
				{/* Hangman ASCII Art */}
				<div className="hangman-display">
					<Hangman wrongGuesses={wrongGuesses} />
				</div>

				{/* Word Display */}
				<div className="word-display">
					{game.word.split('').map((letter, index) => (
						<div 
							key={index} 
							className={displayedWord[index] ? 'letter-box filled' : 'letter-box empty'}
						>
							{displayedWord[index] ? displayedWord[index].toUpperCase() : ''}
						</div>
					))}
				</div>

				{/* Keyboard */}
				<div className="keyboard">
					{keyboardRows.map((row, rowIndex) => (
						<div key={rowIndex} className="keyboard-row">
							{row.map((letter) => (
								<button
									key={letter}
									className={`keyboard-key ${usedLetters.includes(letter.toLowerCase()) ? 'used' : ''}`}
									onClick={() => checkLetter(letter)}
									disabled={usedLetters.includes(letter.toLowerCase())}
								>
									{letter}
								</button>
							))}
						</div>
					))}
				</div>
			</main>
		</div>
	);
}
