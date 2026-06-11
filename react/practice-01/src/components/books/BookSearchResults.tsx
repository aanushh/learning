import type { FC } from "react";
import BookSearchResultsWrapper from "./BookSearchResultsWrapper";

interface Props {
  bookTitles: string[];
  bookTitleIndex: number;
  onSelectBookTitle: (bookTitle: string) => void;
  shouldShowBookTitleResults: boolean;
}

const BookSearchResults: FC<Props> = ({
  bookTitles,
  bookTitleIndex,
  onSelectBookTitle,
  shouldShowBookTitleResults,
}) => {
  if (!shouldShowBookTitleResults) {
    return null;
  }

  if (bookTitles.length === 0) {
    return (
      <BookSearchResultsWrapper>
        <p className="p-1 italic">No results</p>
      </BookSearchResultsWrapper>
    );
  }

  return (
    <BookSearchResultsWrapper>
      <ul>
        {bookTitles.map((bookTitle, i) => (
          <li
            className={`p-1 border-b border-b-gray-300 hover:bg-gray-200 cursor-pointer ${bookTitleIndex === i ? "bg-gray-200" : ""}`}
            key={bookTitle}
            onClick={() => onSelectBookTitle(bookTitle)}
          >
            {bookTitle}
          </li>
        ))}
      </ul>
    </BookSearchResultsWrapper>
  );
};

export default BookSearchResults;
