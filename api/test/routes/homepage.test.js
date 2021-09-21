/**
 * Tests the endpoint "/homepage".
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
const DB_NAME = 'researchify_test_homepage';
/// The homepage route prefix.
const ROUTE_PREFIX = '/homepage';

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

describe('POST /homepage/:team_id', () => {
  it('should return 404 for a non-existent team', async () => {
    const res = await request.post(`${ROUTE_PREFIX}/613b888ffca059539f01fc64`);
    expect(res.status).toBe(404);
  });

  it('should update the homepage', async () => {
    const team = await Team.findOne();
    const data = {
      teamId: team._id.toString(),
      aboutUs: ['Hello', 'World!'],
    };

    const res = await request.post(`${ROUTE_PREFIX}/${team._id.toString()}`)
      .send(data);
    expect(res.status).toBe(200);
    expect(res.body.teamId).toEqual(team._id.toString());
    expect(res.body.aboutUs).toEqual(['Hello', 'World!']);
  });
});

describe('GET /homepage/:team_id', () => {
  it('should return 404 for a non-existent team', async () => {
    const res = await request.get(`${ROUTE_PREFIX}/613b888ffca059539f01fc64`);
    expect(res.status).toBe(404);
  });

  /**
   * When a new Team is created, we are running post-middleware to trigger the
   * creation of associated documents that are default-initialized. This
   * includes the Homepage for a Team.
   */
  it('should return the default for a new team', async () => {
    const team = await Team.findOne();
    const res = await request.get(`${ROUTE_PREFIX}/${team._id.toString()}`);
    expect(res.status).toBe(200);
    expect(res.body.teamId).toEqual(team._id.toString());
    expect(res.body.aboutUs).toEqual([]);
  });
});
