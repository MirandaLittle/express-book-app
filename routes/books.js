import express from 'express';
import getBooks from '../services/books/getBooks.js'; // don't forget .js
import getBookById from '../services/books/getBookById.js';
import createBook from '../services/books/createBook.js';
import deleteBook from '../services/books/deleteBook.js';
import updateBookById from '../services/books/updateBookById.js';
import authMiddleware from '../middleware/advancedAuth.js'; // changed from auth.js to authAdvanced.js
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';

//Instead of attaching the routes directly to the app object, we create a router, and export it in the end.

//create router instance
const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const { genre, available } = req.query
      const books = await getBooks(genre, available)
      res.status(200).json(books)
    } catch (error) {
      console.error(error)
      res.status(500).send('Something went wrong while getting list of books!')
    }
  })

  // for prisma added async, await, try catch error, next(error)
router.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params // we extract the ID from the URL. This uses JavaScript's object destructuring feature. 
      const book = await getBookById(id)
  
      // if (!book) { // we check if our book was found or not
      //   res.status(404).send(`Book with id ${id} was not found!`)
      // } else {
        res.status(200).json(book)
      } catch (error) {
        next(error) // Express Error Handling mechanism does not catch the errors coming from asynchronous code by default
      }
      }, notFoundErrorHandler);
    // } catch (error) {
    //   console.error(error)
    //   res.status(500).send('Something went wrong while getting book by id!')
    // }
// })

router.post('/', authMiddleware, async (req, res) => {
    try {
      const { title, author, isbn, pages, available, genre } = req.body // request body
      console.log("req.body:", req.body)
      const newBook = await createBook(title, author, isbn, pages, available, genre)
      res.status(201).json(newBook) // 201 status code: (successfully) created
      
    } catch (error) {
      console.error(error)
      res.status(500).send('Something went wrong while creating new book!')
    }
  })

router.put('/:id', authMiddleware, (req, res) => {
    // try {
      const { id } = req.params
      const { title, author, isbn, pages, available, genre } = req.body
      const updatedBook = updateBookById(id, title, author, isbn, pages, available, genre)
      res.status(200).json(updatedBook)
}, notFoundErrorHandler);
    // } catch (error) {
    //   console.error(error)
    //   res.status(500).send('Something went wrong while updating book by id!')
    // }
  // })

router.delete('/:id', authMiddleware, (req, res) => {
    // try {
      const { id } = req.params;
      const deletedBookId = deleteBook(id);
  
      // if (!deletedBookId) {
      //   res.status(404).send(`Book with id ${id} was not found!`);
      // } else {
        res.status(200).json({
          message: `Book with id ${deletedBookId} was deleted!`,
        });
      }, notFoundErrorHandler);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send('Something went wrong while deleting book by id!');
  //   }
  // });

export default router;