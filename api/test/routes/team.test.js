/**
 * Tests the endpoint "/team".
 */
const supertest = require('supertest');

const Team = require('../../src/models/team.model');
const {
  connectDb,
  closeConnection,
  clearAllCollections,
  deleteDb,
  seedDb,
} = require('../util/db');
const app = require('../../src/server');

const request = supertest(app);

/// The database used for this test suite.
const DB_NAME = 'researchify_test_team';
/// The team route prefix.
const ROUTE_PREFIX = '/team';

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

describe('POST /', () => {
  it('should return 400 if email is already registered', async () => {
    const data = {
      email: 'tt1@monash.edu',
      password: 'abc123',
    };
    const res = await request.post(ROUTE_PREFIX).send(data);
    expect(res.status).toBe(400);
  });
});
