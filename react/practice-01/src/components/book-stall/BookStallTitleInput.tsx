import type { FC } from "react";
import { useBookStallStore } from "../../stores/book-stall/store";
import Input from "../Input";

const BookStallTitleInput: FC = () => {
  const { title, onChangeTitle } = useBookStallStore();

  return (
    <div className="book-stall-input">
      <Input
        id="title"
        label="Title"
        name="title"
        onChange={onChangeTitle}
        value={title}
      />
    </div>
  );
};

export default BookStallTitleInput;
