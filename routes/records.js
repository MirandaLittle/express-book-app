import express from 'express';
import createRecord from '../services/records/createRecord.js';
import deleteRecord from '../services/records/deleteRecord.js';
import getRecordById from '../services/records/getRecordById.js';
import getRecords from '../services/records/getRecords.js';
import updateRecordById from '../services/records/updateRecordById.js'
import authMiddleware from '../middleware/advancedAuth.js';
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';

const router = express.Router();

router.get('/', (req, res) => {
    try {
      const { artist, genre, available} = req.query
      const records = getRecords(artist, genre, available)
      res.status(200).json(records)
    } catch (error) {
      console.error(error)
      res.status(500).send('Something went wrong while getting list of records!')
    }
  })

  router.get('/:id', (req, res) => {
      const { id } = req.params // we extract the ID from the URL. This uses JavaScript's object destructuring feature. 
      const record = getRecordById(id)
      res.status(200).json(record)
      }, notFoundErrorHandler);


router.post('/', authMiddleware, (req, res) => {
    try {
      const { title, artist, year, available, genre } = req.body // request body
      const newRecord = createRecord(title, artist, year, available, genre)
      res.status(201).json(newRecord) // 201 status code: (successfully) created
    } catch (error) {
      console.error(error)
      res.status(500).send('Something went wrong while creating new record!')
    }
  })

  router.put('/:id', authMiddleware, (req, res) => {
    // try {
      const { id } = req.params
      const { title, artist, year, available, genre } = req.body
      const updatedRecord = updateRecordById(id, title, artist, year, available, genre)
      res.status(200).json(updatedRecord)
  }, notFoundErrorHandler);
  //   } catch (error) {
  //     console.error(error)
  //     res.status(500).send('Something went wrong while updating record by id!')
  //   }
  // })

  router.delete('/:id', authMiddleware, (req, res) => {
    // try {
      const { id } = req.params;
      console.log("req.params:", req.params);
      const deletedRecordId = deleteRecord(id);
  
      // if (!deletedRecordId) {
      //   res.status(404).send(`Record with id ${id} was not found!`);
      // } else {
        res.status(200).json({
          message: `Record with id ${deletedRecordId} was deleted!`,
        });
      }, notFoundErrorHandler);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send('Something went wrong while deleting record by id!');
  //   }
  // });

export default router;