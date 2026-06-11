import { type FC } from "react";
import WordHuntCharacterWrapper from "./WordHuntCharacterWrapper";
import { SECRET_WORD } from "../constants/word";

interface Props {
  guessedWords: string[];
}

const secretWord = SECRET_WORD.toLowerCase();

const WordHuntGuessSection: FC<Props> = ({ guessedWords }) => {
  if (guessedWords.length === 0) {
    return null;
  }

  return (
    <section className={`grid grid-cols-${secretWord.length} gap-2`}>
      {guessedWords.map((guessedWord) => (
        <>
          {guessedWord.split("").map((character, index) => (
            <WordHuntCharacterWrapper
              key={character}
              character={character}
              position={index}
              secretWord={secretWord}
            />
          ))}
        </>
      ))}
    </section>
  );
};

export default WordHuntGuessSection;
