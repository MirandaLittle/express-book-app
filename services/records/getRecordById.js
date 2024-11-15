import recordData from '../../data/records.json' assert { type: "json" };
import NotFoundError from '../../errors/notFoundError.js';

const getRecordById = (id) => {
  const record = recordData.records.find(record => record.id === id);
  if (!record) {
    throw new NotFoundError('Record', id);
  }
  return record
}

export default getRecordById;