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
  const teamInfo = {
    teamName: 'testTeam',
    orgName: 'testOrg',
    email: 'testemail@gmail.com',
    password: 'testpass',
  };

  let res = await request.post('/team').send(teamInfo);

  // Login with new team created and store cookies to global variable
  const loginDetails = {
    email: 'testemail@gmail.com',
    password: 'testpass',
  };
  res = await request.post('/auth/login').send(loginDetails);
  cookies = res.headers['set-cookie'];
});

afterEach(async () => {
  await clearAllCollections();
});

// POST request tests
describe('POST /achievements/:teamId', () => {
  it('should return 404 for a non-existent team', async () => {
    const fakeTeamId = '613b888ffca059539f01fc64';
    const res = await request.post(`${ROUTE_PREFIX}/${fakeTeamId}`);
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
    expect(res.body.title).toEqual(data.title);
    expect(res.body.yearAwarded).toEqual(data.yearAwarded);
    expect(res.body.description).toEqual(data.description);
  });
});

// PATCH Requests tests
describe('PATCH /achievements/:id', () => {
  it('should return 200 for updating a current achievement', async () => {
    // Create an initial achievement
    const team = await Team.findOne({ email: 'testemail@gmail.com' });
    const data = {
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
    const updatedData = {
      title: 'First achievement updated',
      yearAwarded: 2020,
      description: 'First achievement update test',
      teamId: team._id.toString(),
    };
    // Test patch request for current achievement
    res = await request.patch(`${ROUTE_PREFIX}/${achievementId}`)
      .set('Cookie', cookies)
      .send(updatedData);
    expect(res.status).toBe(200);
    expect(res.body.teamId).toEqual(updatedData.teamId);
    expect(res.body.title).toEqual(updatedData.title);
    expect(res.body.yearAwarded).toEqual(updatedData.yearAwarded);
    expect(res.body.description).toEqual(updatedData.description);
  });

  it('should return 404 for an achievement not found', async () => {
    // Data to update a non-existent achivement
    const teamId = '61643c4516cba8e510939fcf';
    const fakeAchievementId = '61643b9d2906971903b2207f';
    const data = {
      title: 'Second achievement updated',
      yearAwarded: 2019,
      description: 'Second achievement update test',
      teamId: `${teamId}`,
    };

    // Test patch request for a non-existent achievement
    const res = await request.patch(`${ROUTE_PREFIX}/${fakeAchievementId}`)
      .set('Cookie', cookies)
      .send(data);
    expect(res.body.code).toBe(404);
  });
});

// DELETE Requests
describe('DELETE /achievements:id', () => {
  it('should return 404 for an achievement not found', async () => {
    // Data for a non-existent achivement
    const teamId = '61643c4516cba8e510939fcf';
    const fakeAchievementId = '61643b9d2906971903b2207f';
    const data = {
      title: 'Non Existent Achievement',
      yearAwarded: 2018,
      description: 'This achievement does not exist.',
      teamId: `${teamId}`,
    };

    // Test delete request for a non-existent achievement
    const res = await request.delete(`${ROUTE_PREFIX}/${fakeAchievementId}`)
      .set('Cookie', cookies)
      .send(data);
    expect(res.body.code).toBe(404);
  });

  it('should return 200 for deleting an existing achievement', async () => {
    // Create an initial achievement
    const team = await Team.findOne({ email: 'testemail@gmail.com' });
    const data = {
      title: 'Unofficial Achievement',
      yearAwarded: 2020,
      description: 'We will be removing this achievement',
      teamId: team._id.toString(),
    };

    let res = await request.post(`${ROUTE_PREFIX}`)
      .set('Cookie', cookies)
      .send(data);

    // Store achievement id to use for delete request
    const achievementId = res.body._id;
    // Test delete request for current achievement
    res = await request.delete(`${ROUTE_PREFIX}/${achievementId}`)
      .set('Cookie', cookies)
      .send(data);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Achievement deleted successfully.');
  });
});

// GET Requests
