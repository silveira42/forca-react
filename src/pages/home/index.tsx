import React from 'react';
import WordInput from '../../components/wordInput';
import Game from '../game';
import { GameStage, useGameContext } from '../../GameContext';
import './styles.css';
import { useAppContext } from '../../AppContext';
import LanguageChooser from '../../components/languageChooser';

export default function Home() {
	const { game } = useGameContext();
	const { intl } = useAppContext();

	const dictionary = intl.getDictionary();

	const chooseWord = (newWord: string) => {
		game.setWord(newWord);
		game.advanceGame();
	};

	return (
		<div>
			<h1>{dictionary.welcome}</h1>
			{game.stage === GameStage.Start && (
				<div>
					<WordInput onChoose={word => chooseWord(word)} />
					<LanguageChooser />
				</div>
			)}
			{game.stage === GameStage.Playing && (
				<div>
					<Game />
				</div>
			)}
		</div>
	);
}
