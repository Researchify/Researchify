/**
 * This module contains the configurations relating to importing publications from the backend.
 */
const pageSize = 10;
const categoryPageSize = 5;
const categoryTypes = {
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
  pageSize, categoryPageSize, categoryTypes, groupByOptions, sortingOptions,
};
