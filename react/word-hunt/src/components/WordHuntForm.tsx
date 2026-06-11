import { useState, type ChangeEvent, type FC, type SubmitEvent } from "react";
import { SECRET_WORD } from "../constants/word";
import Input from "./Input";

interface Props {
  handleSaveGuessedWord: (word: string) => void;
}

const WordHuntForm: FC<Props> = ({ handleSaveGuessedWord }) => {
  const [word, setWord] = useState("");

  const onChangeWordInput = (e: ChangeEvent<HTMLInputElement>) =>
    setWord(e.target.value);

  const handleOnSubmitForm = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleSaveGuessedWord(word);
    setWord("");
  };

  return (
    <form
      onSubmit={handleOnSubmitForm}
      className="flex w-sm justify-center items-center p-4"
    >
      <Input
        id="word-to-guess"
        label="Guess the word"
        onChange={onChangeWordInput}
        value={word}
        maxLength={SECRET_WORD.length}
      />

      <button
        className="bg-gray-400 text-white px-4 py-2 size-fit cursor-pointer rounded-sm"
        type="submit"
      >
        Check
      </button>
    </form>
  );
};

export default WordHuntForm;
