/**
 * This module stores the configuration for using Puppeteer to scrape Google Scholar.
 */

const puppeteerConfig = {
    noOfDummyLinks: 4, // first 4 links aren't publications can be ignored
    noOfThreads: 20, // number of concurrent threads
    pageSize: 20, // number of publications to return at once
    baseUrl: "https://scholar.google.com.sg/citations?hl=en&user=",
    startSuffix: "&cstart=", // concatenate number to start at after
    pageSizeSuffix: "&pagesize=" // concatenate page size after
};

module.exports = { puppeteerConfig }