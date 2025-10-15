import './styles.css';

type HangmanProps = {
	wrongGuesses: number;
};

export default function Hangman(props: HangmanProps) {
	// Gallows structure (always visible)
	const gallows = '+---+\n|     |\n|\n|\n|\n=========';

	// Individual hangman parts with absolute positioning
	const parts = {
		head: props.wrongGuesses >= 1 ? 'o' : '',
		body: props.wrongGuesses >= 2 ? '|' : '',
		leftArm: props.wrongGuesses >= 3 ? '/' : '',
		rightArm: props.wrongGuesses >= 4 ? '\\' : '',
		leftLeg: props.wrongGuesses >= 5 ? '/' : '',
		rightLeg: props.wrongGuesses >= 6 ? '\\' : ''
	};

	return (
		<div className="hangman-container">
			{/* Gallows */}
			<pre className="hangman-gallows">{gallows}</pre>
			
			{/* Hangman parts - positioned absolutely */}
			{parts.head && <div className="hangman-part hangman-head">{parts.head}</div>}
			{parts.body && <div className="hangman-part hangman-body">|</div>}
			{parts.leftArm && parts.rightArm && (
				<div className="hangman-part hangman-arms">/|\</div>
			)}
			{!parts.rightArm && parts.leftArm && (
				<div className="hangman-part hangman-arms">/|</div>
			)}
			{(parts.leftLeg || parts.rightLeg) && (
				<div className="hangman-part hangman-legs">
					<span className="leg-left">{parts.leftLeg}</span>
					<span className="leg-right">{parts.rightLeg}</span>
				</div>
			)}
		</div>
	);
}
