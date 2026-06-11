import type { FC, PropsWithChildren } from "react";

const BookSearchResultsWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      aria-label="book-search-results"
      className="w-2xs h-fit max-h-52 overflow-y-scroll bg-gray-100"
    >
      {children}
    </div>
  );
};

export default BookSearchResultsWrapper;
