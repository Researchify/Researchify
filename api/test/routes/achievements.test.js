/**
 * Tests the achievements controller
 */
const supertest = require('supertest');

const Achievement = require('../../src/models/achievement.model');
const {
  connectDb,
  closeConnection,
  clearAllCollections,
  deleteDb,
  seedDb,
} = require('../util/db');
const app = require('../../src/server');
const { isTag } = require('domhandler');

const request = supertest(app);

/// The database used for this test suite.
const DB_NAME = 'researchify_test_achievements';
/// The homepage route prefix.
const ROUTE_PREFIX = '/achievements'; 

beforeAll(async () => {
  await connectDb(DB_NAME);
});

afterAll(async () => {
  await deleteDb();
  await closeConnection();
});

beforeEach(async () => {
  await seedDb();
});

afterEach(async () => {
  await clearAllCollections();
});

// POST request for invalid team id for an achievement
describe('POST /achievements/:teamId', () => {
  it('should return 404 for a non-existent team', async() => {
    const res = await request.post(`${ROUTE_PREFIX}/613b888ffca059539f01fc64`);
    expect(res.status).toBe(404);
  })
})

// // test connection
// it('should connect to our API', async () => {
//   const res = await request.get('/');
//   expect(res.status)
//     .toBe(200);
// });
