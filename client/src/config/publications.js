/**
 * This module contains the configurations relating to importing publications from the backend.
 */
const pageSize = 10;
const categoryType = {
    JOURNAL: "JOURNAL",
    CONFERENCE: "CONFERENCE",
    BOOK: "BOOK",
    OTHER: "OTHER"
};

module.exports = { pageSize, categoryType }