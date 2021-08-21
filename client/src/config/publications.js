/**
 * This module contains the configurations relating to importing publications from the backend.
 */
const pageSize = 10;
const categoryPageSize = 5;
const categoryType = {
  JOURNAL: 'Journal',
  CONFERENCE: 'Conference',
  BOOK: 'Book',
  OTHER: 'Other',
};
const layoutOption = {
  ALL_PUBLICATION: 'All Publication',
  BY_CATEGORY: 'By Category',
}
const sortingOption = {
  TITLE: 'Title',
  AUTHOR: 'Author',
  YEAR: 'Year',
}

module.exports = { pageSize, categoryPageSize, categoryType, layoutOption, sortingOption };
