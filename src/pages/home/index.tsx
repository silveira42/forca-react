import React from "react";
import WordInput from "../../components/wordInput";
import Game from "../game";
import { GameStage, useGameContext } from "../../GameContext";

export default function Home() {
  const { game } = useGameContext();
  const [ currentWord, setCurrentWord ] = React.useState('');

  const chooseWord = (newWord: string) => {
    setCurrentWord(newWord);
    game.advanceGame();
  }

  return (
    <div>
      <h1>Jogo da Forca!</h1>
      {game.stage === GameStage.Start && (
        <div>
          <WordInput onChoose={(word) => chooseWord(word)} />
        </div>
      )}
      {game.stage === GameStage.Playing && (
        <div>
          <Game word={currentWord}/>
        </div>
      )}
    </div>
  );
}
