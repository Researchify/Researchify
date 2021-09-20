/**
 * Sanity test to check whether we can connect to our API server.
 */
const supertest = require('supertest');

const app = require('../src/server');

const request = supertest(app);

it('should connect to our API', async () => {
  const res = await request.get('/');
  expect(res.status)
    .toBe(200);
});
