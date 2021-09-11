/**
 * This module starts an express REST API server.
 */
const app = require('./app');
const logger = require('./config/log');

const PORT = process.env.PORT || 5000;

// Listen for connections
app.listen(PORT, () => logger.info(`Server running on port: ${PORT}`));
