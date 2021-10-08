/**
 * Tests the achievements controller
 */
const supertest = require('supertest');

const app = require('../../src/server');

const request = supertest(app);

// test connection
it('should connect to our API', async () => {
  const res = await request.get('/');
  expect(res.status)
    .toBe(200);
});
