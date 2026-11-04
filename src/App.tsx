import { useState } from "react";
import { filterUnread, rateBook, searchBooks, sortByYear, toggleRead, type Book } from "./books";
import { initialBooks } from "./data/books";
import { BookCard } from "./components/BookCard";
import { SearchBar } from "./components/SearchBar";
import { StatsCard } from "./components/StatsCard";

export function App() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [query, setQuery] = useState("");
  const [sorted, setSorted] = useState(false);
  const [onlyUnread, setOnlyUnread] = useState(false);

  const searched = searchBooks(books, query);
  const found = onlyUnread ? filterUnread(searched) : searched;
  const visible = sorted ? sortByYear(found) : found;

  return (
    <main className="app">
      <h1>Bookshelf</h1>
      <StatsCard books={books} />
      <div className="toolbar">
        <SearchBar value={query} onChange={setQuery} />
        <label>
          <input
            type="checkbox"
            checked={sorted}
            onChange={(event) => setSorted(event.target.checked)}
          />
          Sort by year
        </label>
        <label>
          <input
            type="checkbox"
            checked={onlyUnread}
            onChange={(event) => setOnlyUnread(event.target.checked)}
          />
          Only unread
        </label>
      </div>
      {visible.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <ul className="book-list">
          {visible.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onToggleRead={(id) => setBooks((current) => toggleRead(current, id))}
              onRate={(id, rating) => setBooks((current) => rateBook(current, id, rating))}
            />
          ))}
        </ul>
      )}
    </main>
  );
}
