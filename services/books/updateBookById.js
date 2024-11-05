import bookData from '../../data/books.json' assert { type: "json" };
import NotFoundError from '../../errors/notFoundError.js';

const updateBookById = (id, title, author, isbn, pages, available, genre) => {
  const book = bookData.books.find(book => book.id === id);

  if (!book) {
    throw new NotFoundError('Book', id);
  }

  book.title = title ?? book.title; // The Nullish Coalescing Operator (??), if "title" is null or undefinced keep original book.title
  book.author = author ?? book.author;
  book.isbn = isbn ?? book.isbn;
  book.pages = pages ?? book.pages;
  book.available = available ?? book.available;
  book.genre = genre ?? book.genre;

  return book;
}

export default updateBookById;

// ?? If a new title (or author, or any other property) is provided, use that to update the book. But if it's not provided (it's null or undefined), just keep the original title (or author, etc.) of the book