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

// TODO: Add logic to a method that accepts some content and adds it to the database

export const putDb = async (_content) => {
  const contactDB = await openDB('jate', 1);
  const tx = contactDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: _content });
  const result = await request;
  console.log('🤖 - The data has been saved to the database. - 📓', result);
}
   

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('getDb not implemented');

  // Create connection to the database and get all the content from the database and return it  
  const contactDb = await openDB('jate', 1);

  // Create a transaction and get the object store
  const txt = contactDB.transaction('jate', 'readonly');

  // Get the object store
  const _store = txt.objectStore('jate')

  // get all the content from the database and return it as an array of objects
  const _request = _store.getAll();

  // Confirm that the data has been retrieved from the database
  const _result = await _request;
  console.log('🤖 - The data has been retrieved from the database. - 📓', _result);
  return _result?.value;
  
};


initdb();
