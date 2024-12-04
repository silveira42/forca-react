type HangmanProps = {
  wrongGuesses: number;
}

export default function Hangman(props: HangmanProps) {
  let hangman = "";
   switch (props.wrongGuesses) {
    case 1:
      hangman = " o\n\n\n\n";
      break;
    case 2:
      hangman = " o\n |\n |\n\n";
      break;
    case 3:
      hangman = " o\n/|\n |\n\n";
      break;
    case 4:
      hangman = " o\n/|\\\n |\n\n";
      break;
    case 5:
      hangman = " o\n/|\\\n |\n/\n";
      break;
    case 6:
      hangman = " o\n/|\\\n |\n/ \\\n";
      break;
  
    default:
      hangman = "\n\n\n\n\n";
      break;
  }

  return (
    <pre>
      {hangman}
    </pre>
  )
}