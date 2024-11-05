import recordData from '../../data/records.json' assert { type: "json" };
import NotFoundError from '../../errors/notFoundError.js';

const updateRecordById = (id, title, artist, year, available, genre) => {
  const record = recordData.records.find(record => record.id === id);

  if (!record) {
    throw new NotFoundError('Record', id);
  }

  record.title = title ?? record.title; // The Nullish Coalescing Operator (??), if "title" is null or undefinced keep original record.title
  record.artist = artist ?? record.artist;
  record.year = year ?? record.year
  record.available = available ?? record.available;
  record.genre = genre ?? record.genre;

  return record;
}

export default updateRecordById;

// ?? If a new title (or artist, or any other property) is provided, use that to update the book. But if it's not provided (it's null or undefined), just keep the original title (or artist, etc.) of the book