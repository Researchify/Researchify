/**
 * Tests the achievements controller
 * 
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

const app = require('../../src/app');

const request = supertest(app);

// test connection
it('should connect to our API', async () => {
  const res = await request.get('/');
  expect(res.status)
    .toBe(200);
});

// /// The database used for this test suite.
// const DB_NAME = 'researchify_test_achievements';
// /// The homepage route prefix.
// const ROUTE_PREFIX = '/achievements';

// beforeAll(async () => {
//   await connectDb(DB_NAME);
// });

// afterAll(async () => {
//   await deleteDb();
//   await closeConnection();
// });

// beforeEach(async () => {
//   await seedDb();
// });

// afterEach(async () => {
//   await clearAllCollections();
// });

// describe('GET /achievements/:teamId', () => {
//   it('should return 404 for a non-existent team', async () => {
//     const res = await request.get(`${ROUTE_PREFIX}/613b888ffca059539f01fc64`);
//     expect(res.status).toBe(404);
//   });
// });

//  describe('GET /achievements/team/:teamId', () => {
//      it('Returns status code of 200 and json containing list of achievements for team with id of 61139b9d59c9be4a68115f23', async () => {
//         const res = await request(app)
//         .get('/achievements/team/61139b9d59c9be4a68115f23')
//         .set('Content-Type', 'application/json')
//         .set('Cookie', ['refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFtIjp7Il9pZCI6IjYxMTM5YjlkNTljOWJlNGE2ODExNWYyMyJ9LCJpYXQiOjE2MzEzNTAwOTIsImV4cCI6MTYzMTYwOTI5Mn0.nXFl3M93E-le-rSuDGETV3nzpXsAqaZmw5v_CZyEMoU;accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFtIjp7Il9pZCI6IjYxMTM5YjlkNTljOWJlNGE2ODExNWYyMyJ9LCJpYXQiOjE2MzEzNTg4NDAsImV4cCI6MTYzMTM1OTc0MH0.QfrRxKWLrycmuaADUQAHbSnde9ldlMJbmzSP1gir2A4']);
        
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toEqual([
//             {
//                 "__v": 0,
//                 "_id": "61235b96ed0f0d5c74a994f8",
//                 "description": "What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lore Ipsum h323to make a type specimen book it has?ne industry&amp;#x27;s standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has? as been the industry&amp;#x27;s standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?", "teamId": "61139b9d59c9be4a68115f23",
//                 "title": "Best Team",
//                 "yearAwarded": 2011
//             },
//             {
//                 "__v": 0,
//                 "_id": "61235b7bed0f0d5c74a994f5",
//                 "description": "What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lore Ipsum h323to make a type specimen book it has?ne industry&amp;#x27;s standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has? as been the industry&amp;#x27;s standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?",
//                 "teamId": "61139b9d59c9be4a68115f23",
//                 "title": "Most Research",
//                 "yearAwarded": 2021
//             },
//             {
//                 "__v": 0,
//                 "_id": "6128a690d277635b70ae84e3",
//                 "description": "dsgergre",
//                 "teamId": "61139b9d59c9be4a68115f23",
//                 "title": "doh",
//                 "yearAwarded": 2020
//             }, 
//             {
//                 "__v": 0,
//                 "_id": "6128a6abd277635b70ae84e7",
//                 "description": "gfsfdg",
//                 "teamId": "61139b9d59c9be4a68115f23",
//                 "title": "first award",
//                 "yearAwarded": 1000
//             }
//         ]);
//      });
//  });

//  describe('GET /achievements/:teamId', () => {
//      it('Returns status code of 404, when teamId does not exist', async() => {
//          request(app)
//          .get('/achievements/team/124')
//          .expect(404)
//      })
//  })
