/**
 * Tests the achievements controller
 */
const supertest = require('supertest');

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

/// Store teamId information globally
let teamId;
/// Store an array of cookies
let cookies;
/// Store the raw data for two achievements that will be created for tests
let firstAchievementData;
let secondAchievementData;
/// Store response body of achievements created. This will contain id of the achievements, which are needed for some tests.
let firstAchievement;
let secondAchievement;

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
  teamId = res.body._id.toString();

  // Login with new team created and store cookies to global variable
  const loginDetails = {
    email: 'testemail@gmail.com',
    password: 'testpass',
  };
  res = await request.post('/auth/login').send(loginDetails);
  cookies = res.headers['set-cookie'];

  // Create two achievements for the team
  firstAchievementData = {
    title: 'First achievement',
    yearAwarded: 2019,
    description: 'First achievement test',
    teamId: `${teamId}`,
  };

  secondAchievementData = {
    title: 'Second Achievement',
    yearAwarded: 2019,
    description: 'This is our second achievement.',
    teamId: `${teamId}`,
  };

  firstAchievement = await request.post(`${ROUTE_PREFIX}`)
    .set('Cookie', cookies)
    .send(firstAchievementData);
  secondAchievement = await request.post(`${ROUTE_PREFIX}`)
    .set('Cookie', cookies)
    .send(secondAchievementData);
});

afterEach(async () => {
  await clearAllCollections();
});

// POST request tests
describe('POST /achievements/:teamId', () => {
  it('should return 404 for a non-existent team', async () => {
    // Try to add new achievement for non-existent team
    const fakeTeamId = '613b888ffca059539f01fc64';
    const res = await request.post(`${ROUTE_PREFIX}/${fakeTeamId}`)
      .set('Cookie', cookies)
      .send(firstAchievementData);
    expect(res.status).toBe(404);
  });

  it('should add new achievement to team, async', async () => {
    // Try to add new achievement for existing team
    const res = await request.post(`${ROUTE_PREFIX}`)
      .set('Cookie', cookies)
      .send(firstAchievementData);
    expect(res.status).toBe(201);
    expect(res.body.teamId).toEqual(`${teamId}`);
    expect(res.body.title).toEqual(firstAchievementData.title);
    expect(res.body.yearAwarded).toEqual(firstAchievementData.yearAwarded);
    expect(res.body.description).toEqual(firstAchievementData.description);
  });
});

// PATCH Request tests
describe('PATCH /achievements/:id', () => {
  it('should return 200 for updating a current achievement', async () => {
    // Store achievement id and updated data to use for patch request
    const achievementId = firstAchievement.body._id;
    const updatedData = {
      title: 'First achievement updated',
      yearAwarded: 2020,
      description: 'First achievement update test',
      teamId: `${teamId}`,
    };
    // Try to update an existing achievement with new data
    const res = await request.patch(`${ROUTE_PREFIX}/${achievementId}`)
      .set('Cookie', cookies)
      .send(updatedData);
    expect(res.status).toBe(200);
    expect(res.body.teamId).toEqual(updatedData.teamId);
    expect(res.body.title).toEqual(updatedData.title);
    expect(res.body.yearAwarded).toEqual(updatedData.yearAwarded);
    expect(res.body.description).toEqual(updatedData.description);
  });

  it('should return 404 for an achievement not found', async () => {
    // Try to update a non-existent achievement
    const fakeAchievementId = '61643b9d2906971903b2207f';
    const res = await request.patch(`${ROUTE_PREFIX}/${fakeAchievementId}`)
      .set('Cookie', cookies)
      .send(firstAchievementData);
    expect(res.body.code).toBe(404);
  });
});

// DELETE Requests
describe('DELETE /achievements:id', () => {
  it('should return 404 for an achievement not found', async () => {
    // Try to delete an non-existent achievement
    const fakeAchievementId = '61643b9d2906971903b2207f';
    const res = await request.delete(`${ROUTE_PREFIX}/${fakeAchievementId}`)
      .set('Cookie', cookies)
      .send(firstAchievementData);
    expect(res.body.code).toBe(404);
  });

  it('should return 200 for deleting an existing achievement', async () => {
    // Try to delete an existing achievement
    const achievementId = firstAchievement.body._id;
    const res = await request.delete(`${ROUTE_PREFIX}/${achievementId}`)
      .set('Cookie', cookies)
      .send(firstAchievementData);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Achievement deleted successfully.');
  });
});

// GET Requests
describe('GET /achievements/team/:teamId', () => {
  it('should return 200 for returning a list of achievements', async () => {
    // Try to retrieve achievements for an existing team
    const res = await request.get(`${ROUTE_PREFIX}/team/${teamId}`)
      .set('Cookie', cookies);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      firstAchievement.body,
      secondAchievement.body,
    ]);
  });
});
