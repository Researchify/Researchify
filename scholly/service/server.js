/**
 * This module configures and starts the Scholly service.
 */
const express = require('express');
const cors = require('cors');

const logger = require('./config/log');
const deployRouter = require('./routes/deploy');


// Create and configure express server
const app = express();
const PORT = process.env.PORT || 8000;

// Use cors and express.json
app.use(cors());
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));

// "Welcome" route
app.get('/', (req, res) => res.send('You have reached the Scholly service'));

// Use the routes
app.use('/deploy', deployRouter);

// Listen for connections
app.listen(PORT, () => logger.info(`Scholly service running on port: ${PORT}`));