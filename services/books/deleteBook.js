import bookData from '../../data/books.json' assert { type: 'json' };
import NotFoundError from '../../errors/notFoundError.js';

const deleteBook = (id) => {
  const index = bookData.books.findIndex((book) => book.id === id);

  if (index === -1) { // findIndex function returns -1 if index is not found
    throw new NotFoundError('Book', id);
  }

  bookData.books.splice(index, 1); // 1 = delete count, 1 item
  return id;
};

export default deleteBook;
