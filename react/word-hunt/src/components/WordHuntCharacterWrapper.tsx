import { type FC } from "react";
import WordHuntCharacter from "./WordHuntCharacter";

interface Props {
  character: string;
  position: number;
  secretWord: string;
}

const WordHuntCharacterWrapper: FC<Props> = ({
  character,
  position,
  secretWord,
}) => {
  const characterPosition = secretWord.indexOf(character);

  if (characterPosition === position) {
    return (
      <WordHuntCharacter
        character={character}
        className="bg-green-500 text-white"
      />
    );
  }

  if (characterPosition > -1) {
    return (
      <WordHuntCharacter
        character={character}
        className="bg-amber-500 text-black"
      />
    );
  }

  return (
    <WordHuntCharacter
      character={character}
      className="bg-red-500 text-white"
    />
  );
};

export default WordHuntCharacterWrapper;
