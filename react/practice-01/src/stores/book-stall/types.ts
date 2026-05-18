import type { ChangeEvent, SubmitEvent } from "react";
import type { Book } from "../../types/book-stall";

export interface BookStallObservables {
  author: string;
  books: Book[];
  bookToEdit?: Book;
  isEditBook: boolean;
  title: string;
}

export interface BookStallActions {
  onAddNewBook: (event: SubmitEvent<HTMLFormElement>) => void;
  onChangeAuthor: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onDeleteBook: (bookId: number) => void;
  onEditBook: (bookId: number) => void;
  onUpdateBook: (event: SubmitEvent<HTMLFormElement>) => void;
}

export type BookStallStore = BookStallObservables & BookStallActions;
