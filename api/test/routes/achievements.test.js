/**
 * Tests the achievements controller
 */
const supertest = require('supertest');

// const Achievement = require('../../src/models/achievement.model');
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
const DB_NAME = 'researchify_test_achievements';
/// The homepage route prefix.
const ROUTE_PREFIX = '/achievements';

/// Store an array of cookies retrieved from login session.
let cookies;

beforeAll(async () => {
  await connectDb(DB_NAME);
});

afterAll(async () => {
  await deleteDb();
  await closeConnection();
});

beforeEach(async () => {
  await seedDb();

  // Create a new team
  let data = {
    teamName: 'testTeam',
    orgName: 'testOrg',
    email: 'testemail@gmail.com',
    password: 'testpass',
  };

  let res = await request.post('/team').send(data);

  // Login with new team created and store cookie to global variable
  data = {
    email: 'testemail@gmail.com',
    password: 'testpass',
  };
  res = await request.post('/auth/login').send(data);
  cookies = res.headers['set-cookie'];
});

afterEach(async () => {
  await clearAllCollections();
});

// POST request tests
describe('POST /achievements/:teamId', () => {
  it('should return 404 for a non-existent team', async () => {
    const res = await request.post(`${ROUTE_PREFIX}/613b888ffca059539f01fc64`);
    expect(res.status).toBe(404);
  });

  it('should add new achievement to team, async', async () => {
    const team = await Team.findOne({ email: 'testemail@gmail.com' });
    const data = {
      title: 'Best team',
      yearAwarded: 2019,
      description: 'We are the best team.',
      teamId: team._id.toString(),
    };

    const res = await request.post(`${ROUTE_PREFIX}`)
      .set('Cookie', cookies)
      .send(data);
    expect(res.status).toBe(201);
    expect(res.body.teamId).toEqual(team._id.toString());
    expect(res.body.title).toEqual('Best team');
    expect(res.body.yearAwarded).toEqual(2019);
    expect(res.body.description).toEqual('We are the best team.');
  });
});

// PATCH Requests tests
describe('PATCH /achievements/:id', () => {
  it('should return 200 for updating a current achievement', async () => {
    // Create an initial achievement
    const team = await Team.findOne({ email: 'testemail@gmail.com' });
    let data = {
      title: 'First achievement',
      yearAwarded: 2019,
      description: 'First achievement test',
      teamId: team._id.toString(),
    };

    let res = await request.post(`${ROUTE_PREFIX}`)
      .set('Cookie', cookies)
      .send(data);

    // Store achievement id to use for patch request
    const achievementId = res.body._id;
    data = {
      title: 'First achievement updated',
      yearAwarded: 2020,
      description: 'First achievement update test',
      teamId: team._id.toString(),
    };
    // Test patch request for current achievement
    res = await request.patch(`${ROUTE_PREFIX}/${achievementId}`)
      .set('Cookie', cookies)
      .send(data);
    expect(res.status).toBe(200);
    expect(res.body.teamId).toEqual(team._id.toString());
    expect(res.body.title).toEqual('First achievement updated');
    expect(res.body.yearAwarded).toEqual(2020);
    expect(res.body.description).toEqual('First achievement update test');
  });

  it('should return 404 for an achievement not found', async () => {
    // Data to update a non-existent achivement
    const data = {
      title: 'Second achievement updated',
      yearAwarded: 2019,
      description: 'Second achievement update test',
      teamId: '61643c4516cba8e510939fcf',
    };

    // Test patch request for a non-existent achievement
    const res = await request.patch(`${ROUTE_PREFIX}/61643b9d2906971903b2207f`)
      .set('Cookie', cookies)
      .send(data);
    expect(res.body.code).toBe(404);
  });
});

// DELETE Requests

// GET Requests
