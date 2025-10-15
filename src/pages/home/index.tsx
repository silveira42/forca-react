import React from 'react';
import WordInput from '../../components/wordInput';
import Game from '../game';
import { GameStage, useGameContext } from '../../GameContext';
import './styles.css';
import { useAppContext } from '../../AppContext';
import LanguageChooser from '../../components/languageChooser';
import { normalizeWord } from '../../util/normalizeWord';

export default function Home() {
	const { game } = useGameContext();
	const { intl } = useAppContext();

	const dictionary = intl.getDictionary();

	const chooseWord = (newWord: string) => {
		// call the normalization function
		game.setWord(normalizeWord(newWord.trim()));
		game.advanceGame();
	};

	const [difficulty, setDifficulty] = React.useState<'easy' | 'medium' | 'hard'>('hard');
	const [singleplayerWord, setSinglePlayerWord] = React.useState('');
	const [multiplayerWord, setMultiplayerWord] = React.useState('');
	const [showWord, setShowWord] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

    const handleChangeDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
        setDifficulty(difficulty)

        getRandomWord()
    }

	const startSinglePlayer = () => {
        if(singleplayerWord === '')
        {
            getRandomWord()
        }
		chooseWord(singleplayerWord);
	};

	const startMultiplayer = () => {
		if (multiplayerWord.trim()) {
			chooseWord(multiplayerWord);
		}
	};

	// Hold to reveal word handlers
	const handleMouseDown = () => {
		setShowWord(true);
	};

	const handleMouseUp = () => {
		setShowWord(false);
	};

	const handleMouseLeave = () => {
		setShowWord(false);
	};

    const getRandomPortugueseWord = () => {
		setIsLoading(true);
		fetch(
			'https://raw.githubusercontent.com/fserb/pt-br/refs/heads/master/icf'
		)
			.then(response => response.text())
			.then(data => {
				// Parse ICF format: "word,score"
				const wordData = data.split('\n')
					.filter(line => line.trim())
					.map(line => {
						const [word, score] = line.split(',');
						return { word: word?.trim(), score: parseFloat(score) };
					})
					.filter(item =>
						item.word &&
						!isNaN(item.score) &&
						item.word.length >= 4 &&
						item.word.length <= 12 &&
						/^[a-záàâãéêíóôõúç]+$/i.test(item.word)
					);

				// Filter by difficulty based on ICF scores
				let filteredWords;
				switch (difficulty) {
					case 'easy':
						// Very common words (high ICF scores)
						filteredWords = wordData.filter(item => item.score >= 10.0);
						break;
					case 'medium':
						// Moderately common words
						filteredWords = wordData.filter(item =>
							item.score >= 8.0 && item.score < 10.0
						);
						break;
					case 'hard':
						// Uncommon/rare words (low ICF scores)
						filteredWords = wordData.filter(item => item.score < 8.0);
						break;
					default:
						filteredWords = wordData;
				}

				// Fallback to all valid words if difficulty selection is empty
				const wordsToUse = filteredWords.length > 0 ? filteredWords : wordData;

				if (wordsToUse.length > 0) {
					const randomItem = wordsToUse[Math.floor(Math.random() * wordsToUse.length)];
					setSinglePlayerWord(randomItem.word);
				} else {
					console.error('No suitable words found');
					setSinglePlayerWord('palavra'); // fallback word
				}
			})
			.catch(error => {
				console.error('Error:', error);
				setSinglePlayerWord('palavra'); // fallback word
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const getRandomEnglishWord = () => {
		setIsLoading(true);
		// Fetch a range of words from CEL repository based on length
		// Using words of 5-8 letters for good balance
		const lengths = [5, 6, 7, 8];
		const randomLength = lengths[Math.floor(Math.random() * lengths.length)];

		fetch(
			`https://raw.githubusercontent.com/Fj00/CEL/main/2-15/${randomLength}.txt`
		)
			.then(response => response.text())
			.then(data => {
				// Parse the word list (each line is a word)
				const words = data.split('\n')
					.filter(line => line.trim())
					.map(line => line.trim().toLowerCase())
					.filter(word =>
						word.length >= 4 &&
						word.length <= 12 &&
						/^[a-z]+$/i.test(word) && // Only English letters
						!word.includes("'") // Exclude contractions
					);

				// Since CEL is already frequency-filtered, we'll simulate difficulty
				// by using different ranges of the sorted word list
				let filteredWords;
				switch (difficulty) {
					case 'easy':
						// Use first 30% of words (most common in CEL)
						filteredWords = words.slice(0, Math.floor(words.length * 0.3));
						break;
					case 'medium':
						// Use middle 40% of words
						const startMedium = Math.floor(words.length * 0.3);
						const endMedium = Math.floor(words.length * 0.7);
						filteredWords = words.slice(startMedium, endMedium);
						break;
					case 'hard':
						// Use last 30% of words (less common in CEL)
						filteredWords = words.slice(Math.floor(words.length * 0.7));
						break;
					default:
						filteredWords = words;
				}

				// Fallback to all words if difficulty selection is empty
				const wordsToUse = filteredWords.length > 0 ? filteredWords : words;

				if (wordsToUse.length > 0) {
					const randomWord = wordsToUse[Math.floor(Math.random() * wordsToUse.length)];
					setSinglePlayerWord(randomWord);
				} else {
					console.error('No suitable English words found');
					setSinglePlayerWord('word'); // fallback word
				}
			})
			.catch(error => {
				console.error('Error fetching CEL words:', error);
				// Fallback to a simple word list
				const fallbackWords = ['word', 'game', 'play', 'fun', 'challenge'];
				setSinglePlayerWord(fallbackWords[Math.floor(Math.random() * fallbackWords.length)]);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const getRandomWord = () => {
		if (intl.getLanguage() === 'pt_br') {
			getRandomPortugueseWord();
		} else {
			getRandomEnglishWord();
		}
	}

	// Load initial word on mount
	React.useEffect(() => {
		getRandomWord();
	}, []);

	// Load new word when language changes
	React.useEffect(() => {
		getRandomWord();
	}, [intl.getLanguage()]);

	// Clear words when returning to start screen
	React.useEffect(() => {
		if (game.stage === GameStage.Start) {
			setMultiplayerWord('');
			getRandomWord();
		}
	}, [game.stage]);

	return (
		<div className="home-container">
			{game.stage === GameStage.Start && (
				<>
					{/* Header */}
					<header className="home-header">
						<h1 className="home-title">{dictionary.game.title.toUpperCase()}</h1>
						<LanguageChooser />
					</header>

					{/* Content */}
					<main className="home-content">
						{/* Hangman ASCII Art */}
						<div className="hangman-ascii">
							<pre>+---+{'\n'}|     |{'\n'}|{'\n'}|{'\n'}|{'\n'}=========</pre>
						</div>

						{/* Game Mode Section */}
						<div className="game-mode-section">
							{/* One Player Card */}
							<div className="game-mode-card">
								<h2 className="card-title">{dictionary.game.singleplayer.toUpperCase()}</h2>
								<div className="card-content">
									<div className="difficulty-section">
										<label className="difficulty-label">{dictionary.game.chooseDifficulty}:</label>
										<div className="dropdown">
											<select
												value={difficulty}
												onChange={(e) => handleChangeDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
												className="dropdown-select"
											>
												<option value="easy">{dictionary.game.easy}</option>
												<option value="medium">{dictionary.game.medium}</option>
												<option value="hard">{dictionary.game.hard}</option>
											</select>
										</div>
									</div>
									<button
										className="start-button"
										onClick={startSinglePlayer}
										disabled={isLoading}
										style={{ opacity: isLoading ? 0.5 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
									>
										{isLoading ? '...' : dictionary.game.start}
									</button>
								</div>
							</div>

							{/* OR Separator */}
                            <div className="or-separator">{dictionary.or.toUpperCase()}</div>

							{/* Multiplayer Card */}
							<div className="game-mode-card">
								<h2 className="card-title">{dictionary.game.multiplayer.toUpperCase()}</h2>
								<div className="card-content">
									<div className="word-section">
										<label className="word-label">{dictionary.game.chooseWord}:</label>
										<div className="password-input-wrapper">
											<input
												type={showWord ? 'text' : 'password'}
												placeholder={dictionary.game.placeholder}
												value={multiplayerWord}
												onChange={(e) => setMultiplayerWord(e.target.value.toLowerCase())}
												className="password-input"
											/>
											<button
												className="eye-reveal-button"
												onMouseDown={handleMouseDown}
												onMouseUp={handleMouseUp}
												onMouseLeave={handleMouseLeave}
												onTouchStart={handleMouseDown}
												onTouchEnd={handleMouseUp}
												type="button"
												title="Pressione para revelar"
												aria-label="Hold to reveal password"
											>
												<svg
													width="20"
													height="20"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													{showWord ? (
														// Eye icon (open - revealing)
														<>
															<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
															<circle cx="12" cy="12" r="3"></circle>
														</>
													) : (
														// Eye-off icon (default - hidden)
														<>
															<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
															<line x1="1" y1="1" x2="23" y2="23"></line>
														</>
													)}
												</svg>
											</button>
										</div>
									</div>
									<button
										className="start-button"
										onClick={startMultiplayer}
										disabled={multiplayerWord.trim() ? false : true}
										style={{ opacity: !multiplayerWord.trim() ? 0.5 : 1, cursor: !multiplayerWord.trim() ? 'not-allowed' : 'pointer' }}
									>
										{!multiplayerWord.trim() ? dictionary.game.type : dictionary.game.start}
									</button>
								</div>
							</div>
						</div>
					</main>
				</>
			)}
			{game.stage === GameStage.Playing && (
				<div>
					<Game />
				</div>
			)}
		</div>
	);
}
