import { type FC } from "react";
import { useBookStallStore } from "../../stores/book-stall/store";

const BookStallSection: FC = () => {
  const { books, onDeleteBook, onEditBook } = useBookStallStore();

  if (books.length === 0) {
    return null;
  }

  return (
    <section className="book-stall-section">
      <h2>Book Stall</h2>

      <div role="grid" className="book-stall-grid">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <div>
              <div className="book-title">{book.title}</div>
              <div className="book-author">{book.author}</div>
            </div>

            <div>
              <button
                className="action-button"
                onClick={() => onEditBook(book.id)}
              >
                ✏️
              </button>
              <button
                className="action-button"
                onClick={() => onDeleteBook(book.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookStallSection;
