/**
 * Exports utilities to seed the database using model-specific seed data.
 */
const Team = require('../../../src/models/team.model');

const teams = require('./team.seed');

/**
 * A utility to seed the {@link Team} collection.
 *
 * NOTE: as insertions to the {@link Team} collection depend on the "save"
 * middleware being run, the .create() method should be used to insert data as
 * opposed to the .insertMany() method, which does not run the "save"
 * middleware.
 * The .create() method is less-optimal and issues individual requests, but
 * it does run the "save" middleware, which {@link Team} depends on to trigger
 * the creation of associated documents.
 *
 * @see https://masteringjs.io/tutorials/mongoose/create
 */
async function seedTeams() {
  await Team.create(teams);
}

/**
 * A utility to seed the entire database.
 */
async function seedDb() {
  await seedTeams();
}

module.exports = seedDb;
