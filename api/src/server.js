/**
 * This module configures and starts an express REST API server.
 */
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
//const csurf = require('csurf');
//const jwt = require('jwt');
require('dotenv').config();

const connectDb = require('./config/db');
const logger = require('./config/log');
const publicationsRouter = require('./routes/publications');
const teamRouter = require('./routes/team');
const authRouter = require('./routes/auth');

// Connect to the database
connectDb();

// Create and configure express server
const app = express();
const PORT = process.env.PORT || 5000;

// Use cors and express.json and cookie parser
app.use(cors());
app.use(express.json({ limit: '30mb', extended: true })); // express.json() parses requests with json payloads and uses "body-parser"
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser())
//app.use(csurf({ cookie: true }))

// app.use(
//     jwt({
//       secret: 'secret123',
//       getToken: req => req.cookies.token
//     })
// );

// "Welcome" route
app.get('/', (req, res) => res.send('You have reached the Researchify API'));

// Use the routes
app.use('/publications', publicationsRouter);
app.use('/team', teamRouter);
app.use('/auth', authRouter)

// Listen for connections
app.listen(PORT, () => logger.info(`Server running on port: ${PORT}`));
