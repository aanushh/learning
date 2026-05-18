import {
  useState,
  type ChangeEvent,
  type FC,
  type PropsWithChildren,
  type SubmitEvent,
} from "react";
import {
  BookStallContext,
  createBookStall,
} from "../../stores/book-stall/store";
import type { Book } from "../../types/book-stall";

const BookStallStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const [observables, setObservables] = useState(createBookStall);

  const onAddNewBook = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!observables.author || !observables.title) {
      return;
    }

    const newBook: Book = {
      author: observables.author,
      id: Date.now(),
      title: observables.title,
    };

    setObservables({
      ...observables,
      author: "",
      books: [...observables.books, newBook],
      title: "",
    });
  };

  const onChangeAuthor = (event: ChangeEvent<HTMLInputElement>) => {
    setObservables({ ...observables, author: event.target.value });
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setObservables({ ...observables, title: event.target.value });
  };

  const onDeleteBook = (bookId: number) => {
    const { books } = observables;

    const remainingBooks = books.filter((book) => book.id !== bookId);

    setObservables({ ...observables, books: remainingBooks });
  };

  const onEditBook = (bookId: number) => {
    const { books } = observables;

    const bookToEdit = books.find((book) => book.id === bookId);

    if (!bookToEdit) {
      return;
    }

    setObservables({
      ...observables,
      bookToEdit,
      author: bookToEdit.author,
      isEditBook: true,
      title: bookToEdit.title,
    });
  };

  const onUpdateBook = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!observables.author || !observables.title || !observables.bookToEdit) {
      return;
    }

    const { author, books, bookToEdit, title } = observables;

    const updatedBooks = books.map((book) => {
      if (book.id === bookToEdit?.id) {
        book.author = author;
        book.title = title;
      }

      return book;
    });

    setObservables({
      ...observables,
      author: "",
      books: updatedBooks,
      bookToEdit: undefined,
      isEditBook: false,
      title: "",
    });
  };

  const store = {
    ...observables,
    onAddNewBook,
    onChangeAuthor,
    onChangeTitle,
    onDeleteBook,
    onEditBook,
    onUpdateBook,
  };

  return (
    <BookStallContext.Provider value={store}>
      {children}
    </BookStallContext.Provider>
  );
};

export default BookStallStoreProvider;
