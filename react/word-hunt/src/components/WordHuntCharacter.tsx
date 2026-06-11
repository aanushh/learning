import { type FC } from "react";

interface Props {
  character: string;
  className?: string;
}

const baseCharacterClassNames: string = "";

const WordHuntCharacter: FC<Props> = ({ character, className = "" }) => {
  return (
    <span
      className={baseCharacterClassNames.concat(
        "size-15 p-2 flex justify-center items-center rounded text-lg ",
        className,
      )}
    >
      {character}
    </span>
  );
};

export default WordHuntCharacter;
