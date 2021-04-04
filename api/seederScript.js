/**
 * Convenience script to insert some default data into the database.
 */
require('dotenv').config()

const connectDb = require('./config/db');
const Publication = require('./models/publication.model');


connectDb();

const defaultPublications = [
    {
        "name": "Pub1",
        "teamSize": 3,
        "leadResearcher": "John",
    },
    {
        "name": "Pub2",
        "teamSize": 4,
        "leadResearcher": "Bob",
    },
    {
        "name": "Pub3",
        "teamSize": 2,
        "leadResearcher": "Kerry",
    },
];

const importData = async () => {
    try {
        await Publication.deleteMany({});

        await Publication.insertMany(defaultPublications);
        console.log('Successfully imported data.');
        process.exit(0);
    } catch (err) {
        console.error('Error importing data.');
        process.exit(1);
    }
};

importData();