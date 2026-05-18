import type { FC } from "react";
import Button from "../Button";
import { useBookStallStore } from "../../stores/book-stall/store";

const BookStallActionButton: FC = () => {
  const { isEditBook } = useBookStallStore();

  return (
    <Button
      className="book-stall-button"
      label={isEditBook ? "Update book" : "Add book"}
      type="submit"
    />
  );
};

export default BookStallActionButton;
