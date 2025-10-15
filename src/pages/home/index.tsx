import React from 'react';
import WordInput from '../../components/wordInput';
import Game from '../game';
import { GameStage, useGameContext } from '../../GameContext';
import './styles.css';
import { useAppContext } from '../../AppContext';
import LanguageChooser from '../../components/languageChooser';
import ThemeToggle from '../../components/themeToggle';

export default function Home() {
	const { game } = useGameContext();
	const { intl } = useAppContext();

	const dictionary = intl.getDictionary();

	const chooseWord = (newWord: string) => {
		game.setWord(newWord);
		game.advanceGame();
	};

	return (
		<div className="home-container">
			<div className="home-header">
				<h1>{dictionary.welcome}</h1>
				<ThemeToggle />
			</div>
			<div className="home-content">
				{game.stage === GameStage.Start && (
					<>
						<WordInput onChoose={word => chooseWord(word)} />
						<LanguageChooser />
					</>
				)}
				{game.stage === GameStage.Playing && (
					<Game />
				)}
			</div>
		</div>
	);
}
