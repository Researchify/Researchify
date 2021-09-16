# API Endpoint Tests

This directory contains test code used to test our Express API endpoints.

## Prerequisites

1. First, follow the installation instructions outlined in the main Researchify [README](../../README.md), if you
   haven't already.

2. The tests operate on a local MongoDB installation and expect the `mongod` daemon to be listening on the default port
   of `27017`. So be sure to [install](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/) MongoDB
   locally.

## Usage

There is no additional setup needed, other than ensuring `mongod` is listening locally on port`27017`. Run the tests
using `npm`.

```bash
cd api
npm run test
```

## Design

This section discusses the design of the tests and how to go about adding a new test. All tests are designed to test a
specific API endpoint. See the [routes](../src/routes) directory for a full list.

| :memo:        | Credit to this [article](https://www.freecodecamp.org/news/end-point-testing/) for helping inform the testing design       |
|---------------|:------------------------|

**Test Stack**:

- [Jest](https://jestjs.io/)
- [Supertest](https://www.npmjs.com/package/supertest)

The tests use `jest` as the testing framework and `supertest` to make requests to our Expresss API server. As with
most `jest` tests, we have 5 types of lifecycle events that take place:

1. **Before All**

   The `beforeAll` hook connects to the local MongoDB instance and creates a new database for **each** endpoint.
2. **After All**

   The `afterAll` hook performs cleanup tasks at the suite level, which include deleting the database created for the
   test and closing the connection.

3. **Before Each**

   The `beforeEach` hook seeds the database with sample data.

4. **After Each**

   The `afterEach` hook clears all documents in all collections.

5. **Test**

   The meat of the test, containing test logic that uses `supertest` to make requests and `jest` matchers to make
   assertions on the response.

A typical test setup before and after each test case can be seen below:

```javascript
beforeAll(async () => {
  await connectDb("name of the test database to create");
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
```

Awesome References:

- https://www.freecodecamp.org/news/end-point-testing/
- https://zellwk.com/blog/endpoint-testing/

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
