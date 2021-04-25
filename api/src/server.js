/**
 * This module configures and starts an express REST API server.
 */
const express = require('express');
const session = require("express-session");
const cors = require('cors');
const passport = require("passport");
require('dotenv').config();

const connectDb = require('./config/db');
const publicationsRouter = require('./routes/publications');
const fooRouter = require('./routes/foo');
const logger = require('./config/log');
const usersRouter = require('./routes/users');


// Connect to the database
connectDb();

// Create and configure express server
const app = express();
const PORT = process.env.PORT || 5000;

// Use express session to store login & session data. Also initialise Passport
app.use(session({
    secret: "researchify_secret_8vme9fnem",
    resave: false,
    saveUninitialized: false,
}));
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// Use cors and express.json
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json({limit: "30mb", extended: true})); // express.json() parses requests with json payloads and uses "body-parser"
app.use(express.urlencoded({limit: "30mb", extended: true}));

// "Welcome" route
app.get('/', (req, res) => res.send('You have reached the Researchify API'));

// Use the routes
app.use('/foo', fooRouter);
app.use('/publications', publicationsRouter);
app.use('/users', usersRouter);

// Listen for connections
app.listen(PORT, () => logger.info(`Server running on port: ${PORT}`));