import type { BooksResponse } from "../types/books";
import { fetchData } from "./client";

export const getBooks = async () => {
  const { data, error } = await fetchData<BooksResponse>(
    "https://api.crossref.org/works",
  );

  const books = data?.message.items || [];

  return { data: books, error };
};
