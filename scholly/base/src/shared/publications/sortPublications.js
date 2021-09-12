import { sortingOptions } from '../config/publications';

const sortPublications = (teamPublications, option) => {
  switch (option) {
    case sortingOptions.AUTHOR:
      teamPublications.sort((a, b) => {
        if (a.authors[0].toLowerCase() > b.authors[0].toLowerCase()) return 1;
        if (a.authors[0].toLowerCase() < b.authors[0].toLowerCase()) return -1;
        return 0;
      });
      break;
    case sortingOptions.TITLE:
      // publication title
      teamPublications.sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        return 0;
      });
      break;
    case 'Category Title':
      // journal or conference title
      teamPublications.sort((a, b) => {
        if (a.category.categoryTitle.toLowerCase() > b.category.categoryTitle.toLowerCase()) return 1;
        if (a.category.categoryTitle.toLowerCase() < b.category.categoryTitle.toLowerCase()) return -1;
        return 0;
      });
      break;
    default:
      // sort by title then year for consistency with the db
      teamPublications.sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        return 0;
      });
      teamPublications.sort((a, b) => {
        if (a.year > b.year) return -1;
        if (a.year < b.year) return 1;
        return 0;
      });
      break;
  }
  return teamPublications;
};

export default sortPublications;
