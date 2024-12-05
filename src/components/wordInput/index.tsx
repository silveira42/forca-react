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

	const getRandomPortugueseWord = () => {
		setIsLoading(true);
		fetch(
			'https://raw.githubusercontent.com/fserb/pt-br/refs/heads/master/verbos'
		)
			.then(response => response.text())
			.then(data => data.split('\n'))
			.then(words => {
				const randomWord = words[Math.floor(Math.random() * words.length)];
				setWord(randomWord);
			})
			.catch(error => console.error('Error:', error))
			.finally(() => setIsLoading(false));
	};

	const getRandomEnglishWord = () => {
		setIsLoading(true);
		fetch('https://random-word-api.herokuapp.com/word?number=1')
			.then(response => response.json())
			.then(data => setWord(data[0]))
			.catch(error => console.error('Error:', error))
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
