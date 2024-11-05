import recordData from '../../data/records.json' assert { type: 'json' };
import NotFoundError from '../../errors/notFoundError.js';

const deleteRecord = (id) => {
  const index = recordData.records.findIndex((record) => record.id === id);

  if (index === -1) { // findIndex function returns -1 if index is not found
    throw new NotFoundError('Record', id);
  }

  recordData.records.splice(index, 1); // 1 = delete count, 1 item
  return id;
};

export default deleteRecord;
