/**
 * This module configures and exports an Express REST API server.
 */
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const publicationsRouter = require('./routes/publications');
const teamRouter = require('./routes/team');
const authRouter = require('./routes/auth');
const themeRouter = require('./routes/theme');
const websiteRouter = require('./routes/website');
const achievementsRouter = require('./routes/achievements');
const homepageRouter = require('./routes/homepage');
const { errorHandler } = require('./middleware/error');
require('./config/log');

// Create Express server
const app = express();

// Use cors and express.json and cookie parser
app.use(cors());
app.use(express.json({ limit: '30mb', extended: true })); // express.json() parses requests with json payloads and uses "body-parser"
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());

// "Welcome" route
app.get('/', (req, res) => res.send('You have reached the Researchify API'));

// Use the routes
app.use('/publications', publicationsRouter);
app.use('/team', teamRouter);
app.use('/auth', authRouter);
app.use('/theme', themeRouter);
app.use('/clientWebsite', websiteRouter);
app.use('/achievements', achievementsRouter);
app.use('/homepage', homepageRouter);

// Use the custom error handling middleware
app.use(errorHandler);

module.exports = app;