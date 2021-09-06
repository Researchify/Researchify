/**
 * This module contains the configurations relating to importing publications from the backend.
 */
const pageSize = 10;
const categoryPageSize = 5;
const categoryType = {
  Journal: 'Journal',
  Conference: 'Conference',
  Book: 'Book',
  Other: 'Other',
};
const layoutOptions = {
  ALL_PUBLICATION: 'All Publication',
  BY_CATEGORY: 'By Category',
};
const sortingOptions = {
  TITLE: 'Title',
  AUTHOR: 'Author',
  YEAR: 'Year',
};
const defaultOption = {
  layout: layoutOptions.ALL_PUBLICATION,
  sortBy: sortingOptions.TITLE,
};
module.exports = {
  pageSize, categoryPageSize, categoryType, layoutOptions, sortingOptions, defaultOption,
};
