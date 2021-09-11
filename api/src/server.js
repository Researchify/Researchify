/**
 * This module starts an express REST API server.
 */
const app = require('./app');
const PORT = process.env.PORT || 5000;
const logger = require('./config/log');

// Listen for connections
app.listen(PORT, () => logger.info(`Server running on port: ${PORT}`));
