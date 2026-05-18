import type { FC } from "react";
import { useBookStallStore } from "../../stores/book-stall/store";
import Input from "../Input";

const BookStallAuthorInput: FC = () => {
  const { author, onChangeAuthor } = useBookStallStore();

  return (
    <div className="book-stall-input">
      <Input
        id="author"
        label="Author"
        name="author"
        onChange={onChangeAuthor}
        value={author}
      />
    </div>
  );
};

export default BookStallAuthorInput;
