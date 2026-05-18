import { createContext, use } from "react";
import type { Book } from "../../types/book-stall";
import type { BookStallObservables, BookStallStore } from "./types";

export const BookStallContext = createContext<BookStallStore>({} as never);

export const createBookStall = (): BookStallObservables => {
  return {
    author: "",
    books: [] as Book[],
    bookToEdit: undefined,
    isEditBook: false,
    title: "",
  };
};

export const useBookStallStore = () => {
  return use(BookStallContext);
};
