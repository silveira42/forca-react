import React from 'react';
import { useKeyPressEvent } from 'react-use';
import './styles.css';
import { useAppContext } from '../../AppContext';

type LetterInputProps = {
	onChoose: (letter: string) => void;
};

export default function LetterInput(props: LetterInputProps) {
	const { intl } = useAppContext();
	const dictionary = intl.getDictionary();

	const [letter, setLetter] = React.useState<string>('');

	useKeyPressEvent('Enter', () => {
		if (letter.length === 1) {
			sendLetter();
		}
	});

	const sendLetter = React.useCallback(() => {
		props.onChoose(letter);
		setLetter('');
	}, [letter, props]);

	const clearLetter = React.useCallback(() => {
		setLetter('');
	}, []);

	const updateLetter = (newLetter: string) => {
		if (letter.length === 0 || newLetter.length === 0) {
			setLetter(newLetter);
		}
	};

	React.useEffect(() => {
		const input = document.getElementById('letter') as HTMLInputElement;
		if (input) {
			input.focus();
		}
	}, [sendLetter, clearLetter]);

	return (
		<div>
			<h2>{dictionary.game.chooseLetter}</h2>
			<input
				id='letter'
				className='letter-input'
				type='text'
				value={letter}
				onChange={e => updateLetter(e.target.value.toLowerCase())}
			/>
			<button className='button' onClick={() => clearLetter()}>
				{dictionary.game.clear}
			</button>
			<button className='button' onClick={() => sendLetter()}>
				{dictionary.game.confirm}
			</button>
		</div>
	);
}
