/**
 * Tests the publications controller.
 * TODO.
 */
const publicationsController = require('../../src/controllers/publications');

jest.mock('mongoose');
jest.createMockFromModule('../../src/models/publication.model');

describe('test suite for publications controller', () => {
  test('check if jest configured correctly', () => {
    expect(1 + 2).toBe(3);
  });
});
