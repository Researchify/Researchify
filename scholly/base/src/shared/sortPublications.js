import { sortingOptions } from './config/publications';

const sortPublications = (publicationToBeSorted, option) => {
  switch (option) {
    case sortingOptions.AUTHOR:
      publicationToBeSorted.sort((a, b) => {
        if (a.authors[0].toLowerCase() > b.authors[0].toLowerCase()) return 1;
        if (a.authors[0].toLowerCase() < b.authors[0].toLowerCase()) return -1;
        return 0;
      });
      break;
    case sortingOptions.TITLE:
      // publication title
      publicationToBeSorted.sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        return 0;
      });
      break;
    case sortingOptions.YEAR:
      // year
      publicationToBeSorted.sort((a, b) => {
        if (a.yearPublished > b.yearPublished) return -1;
        if (a.yearPublished < b.yearPublished) return 1;
        return 0;
      });
      break;
    case 'Category Title':
      // journal or conference title
      publicationToBeSorted.sort((a, b) => {
        if (a.category.categoryTitle.toLowerCase() > b.category.categoryTitle.toLowerCase()) return 1;
        if (a.category.categoryTitle.toLowerCase() < b.category.categoryTitle.toLowerCase()) return -1;
        return 0;
      });
      break;
    default:
      // sort by title then year for consistency with the db
      publicationToBeSorted.sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        return 0;
      });
      publicationToBeSorted.sort((a, b) => {
        if (a.yearPublished > b.yearPublished) return -1;
        if (a.yearPublished < b.yearPublished) return 1;
        return 0;
      });
      break;
  }
  return publicationToBeSorted;
};

export default sortPublications;
