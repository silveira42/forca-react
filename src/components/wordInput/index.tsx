import React from 'react';
import './styles.css';

type WordInputProps = {
	onChoose: (word: string) => void;
};

export default function WordInput(props: WordInputProps) {
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
				Confirm
			</button>
			<button
				className='button'
				onClick={() => setShowWord(!showWord)}
				disabled={isLoading}
			>
				Show/Hide Word
			</button>
			<button
				className='button'
				onClick={() => getRandomPortugueseWord()}
				disabled={isLoading}
			>
				Get random portuguese word
			</button>
			<button
				className='button'
				onClick={() => getRandomEnglishWord()}
				disabled={isLoading}
			>
				Get random english word
			</button>
		</div>
	);
}
