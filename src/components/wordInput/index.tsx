import React from "react";

type WordInputProps = {
  onChoose: (word: string) => void;
};

export default function WordInput(props: WordInputProps) {
  const [ word, setWord ] = React.useState('');
  const [ showWord, setShowWord ] = React.useState(false);

  return (
    <div>
      <input type={showWord ? "text" : "password"} value={word} onChange={(e) => setWord(e.target.value.toLowerCase())} />
      <button onClick={() => props.onChoose(word)}>Confirm</button>
      <button onClick={() => setShowWord(!showWord)}>Show/Hide Word</button>
    </div>
  );
}
