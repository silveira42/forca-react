import React from 'react';

export enum GameStage {
  Start = 'start',
  Playing = 'playing',
  End = 'end'
}

type Game = {
	stage: GameStage;
	advanceGame: () => void;
	resetGame: () => void;
}

const game: Game = {
	stage: GameStage.Start,
	advanceGame: () => {},
	resetGame: () => {},
};

const GameContext = React.createContext({
	game: game,
});

export const GameContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [gameStage, setGameStage] = React.useState<GameStage>(
		GameStage.Start
	);
	
	game.stage = gameStage;
	game.advanceGame = () => {
		if (gameStage === GameStage.Start) {
			setGameStage(GameStage.Playing);
		} else if (gameStage === GameStage.Playing) {
			setGameStage(GameStage.End);
		} else {
			setGameStage(GameStage.Start);
		}
	};

	game.resetGame = () => {
		setGameStage(GameStage.Start);
	};

	return (
		<GameContext.Provider value={{ game }}>
			{children}
		</GameContext.Provider>
	);
};

export const useGameContext = () => React.useContext(GameContext);
