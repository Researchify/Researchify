/**
 * This module contains the configurations relating to the options Researchify users have to create their website
 */
const availablePages = ['PUBLICATIONS', 'TEAM', 'ACHIEVEMENTS'];

// pages descriptions in here, refactor availablePages to list of objects
const pageDescriptions = {
  PUBLICATIONS: 'A page to list all of your publications.',
  TEAM: 'A page to list the members in your research group.',
  ACHIEVEMENTS: 'A page to list the achievements received for your publications.',
};

const darkThemePlaceholder = 'dark';
const lightThemePlaceholder = 'light';

module.exports = {
  availablePages, darkThemePlaceholder, lightThemePlaceholder, pageDescriptions,
};
