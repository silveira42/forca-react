import React from 'react';
import './styles.css';
import { useAppContext } from '../../AppContext';

type WordInputProps = {
	onChoose: (word: string) => void;
};

export default function WordInput(props: WordInputProps) {
	const { intl } = useAppContext();

	const dictionary = intl.getDictionary();

	const [word, setWord] = React.useState('');
	const [showWord, setShowWord] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [difficulty, setDifficulty] = React.useState<'easy' | 'medium' | 'hard'>('medium');

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
					setWord(randomItem.word);
				} else {
					console.error('No suitable words found');
					setWord('palavra'); // fallback word
				}
			})
			.catch(error => console.error('Error:', error))
			.finally(() => setIsLoading(false));
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
					setWord(randomWord);
				} else {
					console.error('No suitable English words found');
					setWord('word'); // fallback word
				}
			})
			.catch(error => {
				console.error('Error fetching CEL words:', error);
				// Fallback to a simple word list
				const fallbackWords = ['word', 'game', 'play', 'fun', 'challenge'];
				setWord(fallbackWords[Math.floor(Math.random() * fallbackWords.length)]);
			})
			.finally(() => setIsLoading(false));
	};

	const getRandomWord = () => {
		if (intl.getLanguage() === 'pt_br') {
			getRandomPortugueseWord();
		} else {
			getRandomEnglishWord();
		}
	}

	return (
		<div>
			<div className="difficulty-selector" style={{ marginBottom: '10px' }}>
				<label htmlFor="difficulty-select" style={{ marginRight: '10px' }}>
					{dictionary.game.difficulty}:
				</label>
				<select
					id="difficulty-select"
					value={difficulty}
					onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
					disabled={isLoading}
					style={{ padding: '5px', marginRight: '10px' }}
				>
					<option value="easy">{dictionary.game.easy}</option>
					<option value="medium">{dictionary.game.medium}</option>
					<option value="hard">{dictionary.game.hard}</option>
				</select>
			</div>
			<input
				id='word-input'
				className='input'
				type={showWord ? 'text' : 'password'}
				value={word}
				onChange={e => setWord(e.target.value.toLowerCase())}
				disabled={isLoading}
			/>
			<button
				className='button'
				onClick={() => props.onChoose(word)}
				disabled={isLoading}
			>
				{dictionary.game.confirm}
			</button>
			<button
				className='button'
				onClick={() => setShowWord(!showWord)}
				disabled={isLoading}
			>
				{dictionary.game.showHideWord}
			</button>
			<button
				className='button'
				onClick={() => getRandomWord()}
				disabled={isLoading}
			>
				{dictionary.game.generateRandomWord}
			</button>
		</div>
	);
}
