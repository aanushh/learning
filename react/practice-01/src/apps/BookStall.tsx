import { type FC } from "react";
import BookStallSection from "../components/book-stall/BookStallSection";
import BookStallStoreProvider from "../components/book-stall/BookStallStoreProvider";
import BookStallForm from "../components/book-stall/BookStallForm";

import "../styles/book-stall.css";

const BookStallApp: FC = () => {
  return (
    <BookStallStoreProvider>
      <BookStallForm />
      <BookStallSection />
    </BookStallStoreProvider>
  );
};

export default BookStallApp;
