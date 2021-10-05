/**
 * Exports utilities to manage the lifecycle of a MongoDB database during a test.
 */
const mongoose = require('mongoose');

const seedDb = require('./seeds');

/// Port the test database is listening on.
const PORT = process.env.DB_TEST_PORT || 27017;
/// Hostname of the test database.
const DB_HOST = process.env.DB_TEST_HOST || 'localhost';

/**
 * This utility is used to connect to a MongoDB database at the start of a test
 * suite. The database given by dbName will be created if it doesn't exist.
 *
 * @param dbName name of the database to connect to/create.
 */
async function connectDb(dbName) {
  const uri = `mongodb://${DB_HOST}:${PORT}/${dbName}`;
  await mongoose.connect(uri);
}

/**
 * This utility closes the present database connection. It should be used after
 * each test suite.
 */
async function closeConnection() {
  await mongoose.connection.close();
}

/**
 * This utility is used to clear all documents in all collections for the
 * present database connection. It should be used after each test.
 */
async function clearAllCollections() {
  const collectionNames = Object.keys(mongoose.connection.collections);
  const toDeletePromises = [];
  collectionNames.forEach((name) => {
    const collection = mongoose.connection.collections[name];
    toDeletePromises.push(collection.deleteMany({}));
  });
  await Promise.all(toDeletePromises);
}

/**
 * This utility is used to drop/delete the entire database for the present
 * connection. It should be used after each test suite.
 */
async function deleteDb() {
  await mongoose.connection.db.dropDatabase();
}

module.exports = {
  connectDb,
  closeConnection,
  clearAllCollections,
  deleteDb,
  seedDb,
};
