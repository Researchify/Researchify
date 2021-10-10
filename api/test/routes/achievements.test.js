/**
 * Tests the achievements controller
 */
const supertest = require('supertest');

const Achievement = require('../../src/models/achievement.model');
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
    teamName: "testTeam",
    orgName: "testOrg",
    email: "testemail@gmail.com",
    password: "testpass",
  }

  let res = await request.post('/team').send(data);

  // Login with new team created and store cookie to global variable
  data = {
    email: "testemail@gmail.com",
    password: "testpass",
  }
  res = await request.post('/auth/login').send(data);
  console.log(res.headers);
  console.log(res.headers['set-cookie']);
  cookies = res.headers['set-cookie'];
  //console.log(res);
});

afterEach(async () => {
  await clearAllCollections();
});

// POST request tests
describe('POST /achievements/:teamId', () => {
  it('should return 404 for a non-existent team', async() => {
    res = await request.post(`${ROUTE_PREFIX}/613b888ffca059539f01fc64`);
    expect(res.status).toBe(404);
  })

  it('should add achievement to team, async', async () => {
    const team = await Team.findOne({email: "testemail@gmail.com"});
    console.log(team);
    data = {
      title: "Best team",
      yearAwarded: 2019,
      description: "We are the best team.",
      teamId: team._id.toString(),
    };
    
    res = await request.post(`${ROUTE_PREFIX}/${team._id.toString()}`)
      .set('Cookie', cookies)
      .send(data);
    expect(res.status).toBe(201);
    expect(res.body.teamId).toEqual(team._id.toString());
    expect(res.body.title).toEqual("Best team");
    expect(res.body.yearAwarded).toEqual(2019);
    expect(res.body.description).toEqual("We are the best team.");
  });
});

// // test connection
// it('should connect to our API', async () => {
//   const res = await request.get('/');
//   expect(res.status)
//     .toBe(200);
// });
