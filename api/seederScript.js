/**
 * Convenience script to insert some default data into the database.
 */
require('dotenv').config()

const connectDb = require('./config/db');
const Publication = require('./models/publication.model');
const User = require('./models/user.model');


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

const defaultUsers = [
    {
        "givenName": "Joel",
        "familyName": "Selwood",
        "email": "jselwood_goat_captian@gmail.com",
        "password": "afl_champx3",
    },
    {
        "givenName": "Patrick",
        "familyName": "Dangerfield",
        "email": "paddy_danger123@gmail.com",
        "password": "Brownlow_2016",
    },
    {
        "givenName": "Tom",
        "familyName": "Hawkins",
        "email": "tomahawk_26@gmail.com",
        "password": "THawk_coleman_2020",
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

const populateUsers = async () => {
    try {
        await User.deleteMany({});

        await User.insertMany(defaultUsers);
        console.log('Successfully imported users.');
        process.exit(0);
    } catch (err) {
        console.error('Error importing users.');
        process.exit(1);
    }
};

importData();
populateUsers();