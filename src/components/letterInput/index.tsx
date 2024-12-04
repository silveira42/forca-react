import React from 'react';

type LetterInputProps = {
	onChoose: (letter: string) => void;
};

export default function LetterInput(props: LetterInputProps) {
	const [letter, setLetter] = React.useState<string>('');

	const sendLetter = () => {
		props.onChoose(letter);
		setLetter('');
	};

	const clearLetter = () => {
		setLetter('');
	};

	return (
		<div>
			<h2>Type the next letter!</h2>
			<input
				disabled={letter.length > 0}
				type='text'
				value={letter}
				onChange={e => setLetter(e.target.value.toLowerCase())}
			/>
			<button onClick={() => clearLetter()}>Clear</button>
			<button onClick={() => sendLetter()}>Check</button>
		</div>
	);
}
