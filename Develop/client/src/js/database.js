import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Create a connection to the database and specify the version we want to use.
  const db = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = db.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .put() method on the store and pass in the content.
  const request = store.put({ content });

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database and specify the version we want to use.
  const db = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = db.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data retrieved from the database', result);
  return result;
};

initdb();
