/**
 * This module contains the configurations relating to importing publications from the backend.
 */
const pageSize = 10;
const categoryPageSize = 5;
const categoryTypes = {
  JOURNAL: 'Journal',
  CONFERENCE: 'Conference',
  BOOK: 'Book',
  OTHER: 'Other',
};
const layoutOptions = {
  ALL_PUBLICATION: 'All Publication',
  BY_CATEGORY: 'By Category',
}
const sortingOptions = {
  TITLE: 'Title',
  AUTHOR: 'Author',
  YEAR: 'Year',
}

module.exports = { pageSize, categoryPageSize, categoryTypes, layoutOptions, sortingOptions };
