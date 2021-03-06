/**
 * Convenience script to insert some default data into the database.
 */ /* eslint-disable no-console */
require('dotenv').config();

const connectDb = require('./config/db');
const Publication = require('./models/publication.model');
const Team = require('./models/team.model');
const Template = require('./models/editor/template.model');
const Theme = require('./models/editor/theme.model');

connectDb();

const defaultPublications = [
  {
    teamId: '606bb59c22201f529db920c9', // teamIds from a fake team manually created in the db
    authors: ['A', 'B', 'C'],
    title:
      'Case definitions for infectious conditions under public health surveillance',
    link: 'https://wonder.cdc.gov/wonder/Prevguid/m0047449/m0047449.asp',
    description:
      'State and local public health officials rely on health-care providers, laboratories, and other\n'
      + 'public health personnel to report the occurrence of notifiable diseases to state and local\n'
      + 'health departments.',
    category: {
      type: 'CONFERENCE',
      categoryTitle: 'Sample',
    },
  },
  {
    teamId: '606bb59c22201f529db920c9',
    authors: ['D', 'E', 'F'],
    title:
      'Staphylococcus aureus with reduced susceptibility to vancomycin--United States, 1997',
    link: 'http://wonder.cdc.gov/wonder/PrevGuid/m0049042/m0049042.asp',
    description:
      'Staphylococcus aureus is one of the most common causes of both hospital-and community-'
      + 'acquired infections worldwide, and the antimicrobial agent vancomycin',
    category: {
      type: 'CONFERENCE',
      categoryTitle: 'Sample',
    },
  },
  {
    teamId: '606bb5c022201f529db920ca',
    authors: ['G', 'H', 'I'],
    title: 'Diagnostic standards and classification of tuberculosis',
    link: 'https://wonder.cdc.gov/wonder/Prevguid/p0000425/p0000425.asp',
    description:
      'Historically, the American Thoracic Society (ATS) and the Centers for Disease Control'
      + '(CDC) have provided guidance on the diagnosis, treatment, prevention, and control of'
      + 'tuberculosis in the United States and Canada. ',
    category: {
      type: 'CONFERENCE',
      categoryTitle: 'Sample',
    },
  },
];

const defaultThemes = [
  {
    primaryColor: '#4DD0E1',
    secondaryColor: '#FFFFFF',
  },
  {
    primaryColor: '#FF5733',
    secondaryColor: '#FFFFFF',
  },
];

const defaultTemplates = [
  {
    isDefault: true,
    themeId: '609f593f4edeaf8147dc537d', // retrieved id after populating themes
  },
  {
    isDefault: false,
    themeId: '609f593f4edeaf8147dc537e',
  },
];

const defaultTeams = [
  {
    _id: '60e064e012c8b47402f7309f', // force to use defined uuid
    teamName: 'TestTeam1',
    dateCreated: Date.now(),
    templateId: '609f5a397c35738204fded7a', // retrieved id after populating templates
  },
  {
    _id: '60e064e012c8b47402f730a0', // force to use defined uuid
    teamName: 'TestTeam2',
    dateCreated: Date.now(),
    templateId: '609f5a397c35738204fded7a',
  },
  {
    _id: '60e064e012c8b47402f730a1', // force to use defined uuid
    teamName: 'TestTeam3',
    dateCreated: Date.now(),
    templateId: '609f5a397c35738204fded7b',
  },
];

const populatePublications = async () => {
  try {
    // await Publication.deleteMany({});

    await Publication.insertMany(defaultPublications);
    console.log('Successfully imported data.');
    process.exit(0);
  } catch (err) {
    console.error(`Error importing data.\n${err}`);
    process.exit(1);
  }
};

const populateThemes = async () => {
  try {
    // await Theme.deleteMany({});

    await Theme.insertMany(defaultThemes);
    console.log('Successfully imported themes.');
    process.exit(0);
  } catch (err) {
    console.error('Error importing themes.');
    process.exit(1);
  }
};

const populateTemplates = async () => {
  try {
    // await Template.deleteMany({});

    await Template.insertMany(defaultTemplates);
    console.log('Successfully imported templates.');
    process.exit(0);
  } catch (err) {
    console.error('Error importing templates.');
    process.exit(1);
  }
};

const populateTeams = async () => {
  try {
    // await Team.deleteMany({}); // frontend code relies on one of the default teams, don't remove it

    await Team.insertMany(defaultTeams);
    console.log('Successfully imported teams.');
    process.exit(0);
  } catch (err) {
    console.error('Error importing teams.');
    process.exit(1);
  }
};

populatePublications();
populateThemes();
populateTemplates();
populateTeams();
