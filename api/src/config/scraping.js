/**
 * This module stores the configuration for using Puppeteer to scrape Google Scholar.
 */

const scrapingConfig = {
  pageSize: 10, // number of publications to return at once
  gScholarHome: 'https://scholar.google.com',
  baseUrl: 'https://scholar.google.com/citations?hl=en&user=',
  startSuffix: '&cstart=', // concatenate number to start at after
  pageSizeSuffix: '&pagesize=', // concatenate page size after
  sortBySuffix: '&view_op=list_works&sortby=pubdate', // put most recent pubs first
};

module.exports = { scrapingConfig };
