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

// Connect to the database
connectDb();

module.exports = app;
