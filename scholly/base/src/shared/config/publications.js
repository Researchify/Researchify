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
const groupByOptions = {
  NONE: 'None',
  CATEGORY: 'Category',
};
const sortingOptions = {
  TITLE: 'Title',
  AUTHOR: 'Author',
  YEAR: 'Year',
};

module.exports = {
  pageSize, categoryPageSize, categoryType, groupByOptions, sortingOptions,
};
