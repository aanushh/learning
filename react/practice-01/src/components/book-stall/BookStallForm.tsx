import type { FC } from "react";
import { useBookStallStore } from "../../stores/book-stall/store";
import BookStallAuthorInput from "./BookStallAuthorInput";
import BookStallTitleInput from "./BookStallTitleInput";
import BookStallActionButton from "./BookStallActionButton";

const BookStallForm: FC = () => {
  const { bookToEdit, onAddNewBook, onUpdateBook } = useBookStallStore();

  const isEditBookAction =
    typeof bookToEdit === "object" && typeof bookToEdit.id === "number";

  return (
    <form
      onSubmit={isEditBookAction ? onUpdateBook : onAddNewBook}
      className="book-stall-form"
    >
      <BookStallTitleInput />
      <BookStallAuthorInput />
      <BookStallActionButton />
    </form>
  );
};

export default BookStallForm;
