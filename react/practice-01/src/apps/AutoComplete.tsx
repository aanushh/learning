import {
  use,
  useMemo,
  useState,
  type ChangeEvent,
  type FC,
  type KeyboardEvent,
} from "react";
import { getBooks } from "../api/books";
import Input from "../components/Input";
import BookSearchResults from "../components/books/BookSearchResults";
import useDebounce from "../hooks/useDebounce";

// Not a best practice, use a query library instead
const booksPromise = getBooks();

const AutoComplete: FC = () => {
  const { data } = use(booksPromise);
  const [searchInput, setSearchInput] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchIndex, setSearchIndex] = useState(-1);

  const handleDisplaySearchResults = useDebounce((shouldShow: boolean) => {
    setShowSearchResults(shouldShow);
  }, 300);

  const bookSearchResults = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.reduce((matchingBooks, book) => {
      const title = book.title[0] || "";

      if (!title.toLowerCase().includes(searchInput?.toLowerCase())) {
        return matchingBooks;
      }

      if (!matchingBooks.includes(title)) {
        matchingBooks.push(title);
      }

      return matchingBooks;
    }, [] as string[]);
  }, [data, searchInput]);

  const handleOnChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;

    setSearchInput(searchValue);
    handleDisplaySearchResults(typeof searchValue === "string");
  };

  const handleOnSelectBookTitle = (bookTitle: string) => {
    setSearchInput(bookTitle);
    setShowSearchResults(false);
    setSearchIndex(-1);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;

    switch (key) {
      case "ArrowDown": {
        setSearchIndex((prev) => {
          if (prev > bookSearchResults.length - 1) {
            return prev;
          }

          return prev + 1;
        });

        break;
      }
      case "ArrowUp": {
        setSearchIndex((prev) => {
          if (prev < 0) {
            return prev;
          }

          return prev - 1;
        });

        break;
      }
      case "Enter": {
        setSearchInput(bookSearchResults[searchIndex]);
        setShowSearchResults(false);
        setSearchIndex(-1);

        break;
      }
      default:
    }
  };

  return (
    <section className="m-4">
      <Input
        className="text-base border px-0.5 w-2xs"
        label="Search books"
        onChange={handleOnChangeInput}
        onFocus={() => setShowSearchResults(true)}
        onBlur={() => {
          setShowSearchResults(false);
          setSearchIndex(-1);
        }}
        onKeyDown={handleOnKeyDown}
        placeholder="Type a book title ..."
        type="text"
        value={searchInput}
      />

      <BookSearchResults
        bookTitles={bookSearchResults}
        bookTitleIndex={searchIndex}
        onSelectBookTitle={handleOnSelectBookTitle}
        shouldShowBookTitleResults={showSearchResults}
      />
    </section>
  );
};

export default AutoComplete;
