export type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
  /** 1 to 5 stars, or null when the book has no rating yet */
  rating: number | null;
  read: boolean;
};

/**
 * Returns the books whose title or author contains the query.
 */
export function searchBooks(books: Book[], query: string): Book[] {
  const needle = query.trim().toLowerCase();
  if (needle === "") {
    return [...books];
  }
  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(needle) ||
      book.author.toLowerCase().includes(needle),
  );
}

/**
 * Returns the average rating of the rated books, rounded to one decimal.
 * Books without a rating are ignored. Returns null if no book has a rating.
 */
export function averageRating(books: Book[]): number | null {
  const ratings = books
    .map((book) => book.rating)
    .filter((rating): rating is number => rating !== null);
  if (ratings.length === 0) {
    return null;
  }
  const sum = ratings.reduce((total, rating) => total + rating, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
}

/**
 * Returns the books sorted by year, oldest first.
 */
export function sortByYear(books: Book[]): Book[] {
  return [...books].sort((a, b) => a.year - b.year);
}

/**
 * Returns how many books are marked as read.
 */
export function countRead(books: Book[]): number {
  return books.filter((book) => book.read).length;
}

/**
 * Returns a copy of the books where the book with the given id has the
 * opposite read state.
 */
export function toggleRead(books: Book[], id: string): Book[] {
  return books.map((book) =>
    book.id === id ? { ...book, read: !book.read } : book,
  );
}
