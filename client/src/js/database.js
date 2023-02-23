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

export const putDb = async (content) => {
  console.log('Put to the Database');

  // Create a connection to the database database and version we want to use.
  // The "openDB" function is a part of the "idb" library, which provides a simple and efficient way to interact with IndexedDB databases. The function takes two parameters - the name of the database to open, and the version number of the database schema.
  const contactDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  // The "transaction" method of the "contactDb" object creates a new transaction. The first parameter is the name of the object store to use, and the second parameter is the type of transaction to create. The "readwrite" parameter specifies that the transaction should have read and write privileges.
  const tx = contactDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  // The "objectStore" method of the "tx" object opens up the desired object store. The parameter is the name of the object store to open.
  const store = tx.objectStore('jate');

  const request = store.put({id: 1,value: content});
  const result = await request;
  console.log('Saved to Database', result);
};

export const getDb = async () => {
  console.log('Get to the Database')

  // Create a connection to the database database and version we want to use.
  // The "openDB" function is a part of the "idb" library, which provides a simple and efficient way to interact with IndexedDB databases. The function takes two parameters - the name of the database to open, and the version number of the database schema.
  const contactDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  // The "transaction" method of the "contactDb" object creates a new transaction. The first parameter is the name of the object store to use, and the second parameter is the type of transaction to create. The "readwrite" parameter specifies that the transaction should have read and write privileges.
  const tx = contactDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  // The "objectStore" method of the "tx" object opens up the desired object store. The parameter is the name of the object store to open.
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  // The "getAll" method of the "store" object retrieves all data from the object store. The method returns a promise, which resolves with an array of all the data in the object store.
  const request = store.get(1);

  // Get confirmation of the request.
  //The "done" property of the "request" object is a promise, which resolves when the request is complete. The "value" property of the "request" object contains the data that was retrieved from the object store.
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();
