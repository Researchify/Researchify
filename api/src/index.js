/**
 * This module connects to the database and starts up the Express REST API server.
 */
const app = require('./server');
const connectDb = require('./config/db');
const logger = require('./config/log');

const PORT = process.env.PORT || 5000;

// Connect to the database
connectDb();

// Listen for connections
app.listen(PORT, () => logger.info(`Server running on port: ${PORT}`));
