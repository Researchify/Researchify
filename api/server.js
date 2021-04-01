/**
 * This module configures and starts an express REST API server.
 */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const fooRouter = require('./routes/foo');

// Create and configure express server
const app = express();
const PORT = process.env.PORT || 5000;
const CONNECTION_URI = process.env.ATLAS_URI;

// Use cors and express.json
app.use(cors());
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));

// Use the routes
app.get('/', (req, res) => res.send('You have reached the Researchify API'));
app.use('/foo', fooRouter);

// Connect to the db and once successful, make the server listen for connections
// mongoose.connect(CONNECTION_URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
//     .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
//     .catch(err => console.log(`Failed to establish connection to MongoDB database: ${err.message}`));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));