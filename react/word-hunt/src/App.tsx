import { useMemo, useState, type FC } from "react";
import { SECRET_WORD } from "./constants/word";
import WordHuntForm from "./components/WordHuntForm";
import WordHuntGuessSection from "./components/WordHuntGuessSection";
import WordHuntAppWrapper from "./components/WordHuntAppWrapper";

const App: FC = () => {
  const [guessedWords, setGuessedWords] = useState<string[]>([]);

  const handleSaveGuessedWord = (word: string) => {
    setGuessedWords((prev) => [...prev, word]);
  };

  const isGameOver = guessedWords.length === SECRET_WORD.length;
  const isWordGuessed = useMemo(() => {
    const foundWord = guessedWords.find(
      (guessedWord) => guessedWord.toLowerCase() === SECRET_WORD.toLowerCase(),
    );

    return Boolean(foundWord);
  }, [guessedWords]);

  if (isWordGuessed) {
    return (
      <WordHuntAppWrapper>
        <h3 className="font-bold text-2xl">You won!</h3>
      </WordHuntAppWrapper>
    );
  }

  if (isGameOver && !isWordGuessed) {
    return (
      <WordHuntAppWrapper>
        <h3 className="font-bold text-2xl">You Lost!</h3>
      </WordHuntAppWrapper>
    );
  }

  return (
    <WordHuntAppWrapper>
      <div className="w-1/3 h-2/4 p-4 border border-gray-300 rounded-sm flex flex-col items-center">
        <WordHuntForm handleSaveGuessedWord={handleSaveGuessedWord} />

        <WordHuntGuessSection guessedWords={guessedWords} />
      </div>
    </WordHuntAppWrapper>
  );
};

export default App;
