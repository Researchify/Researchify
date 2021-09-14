/**
 * This module stores the configuration for using Puppeteer to scrape Google Scholar.
 */
const { firefox } = require('playwright-firefox');

const playwrightConfig = {
  noOfDummyLinks: 4, // first 4 links aren't publications can be ignored
  pageSize: 10, // number of publications to return at once
  gScholarHome: 'https://scholar.google.com',
  baseUrl: 'https://scholar.google.com/citations?hl=en&user=',
  startSuffix: '&cstart=', // concatenate number to start at after
  pageSizeSuffix: '&pagesize=', // concatenate page size after
  sortBySuffix: '&view_op=list_works&sortby=pubdate', // put most recent pubs first
};

const browserContext = firefox.launch().then((browser) => browser.newContext()).then((context) => context);

const getBrowser = async () => browserContext;

module.exports = { playwrightConfig, getBrowser };
