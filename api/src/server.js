/**
 * This module starts an express REST API server.
 */
const app = require('./app');
const logger = require('./config/log');

// Listen for connections
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port: ${PORT}`));
