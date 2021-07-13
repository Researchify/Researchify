import {
  IMPORT_REQUEST,
  IMPORT_SUCCESS,
  IMPORT_FAIL,
  IMPORT_CLEAR_STATE,
  UPDATE_GSCHOLAR_ID,
  IMPORT_END,
  CHANGE_ACTIVE_PAGE,
  UPDATE_PUBLICATIONS_TO_IMPORT,
} from '../actions/types';
import { pageSize } from '../config/publications';

const initialState = {
  loading: false,
  importStatus: null,
  publications: [],
  error: null,
  gScholarId: '',
  startFrom: 0,
  reachedEnd: false,
  totalPages: 0,
  activePage: 0,
  shownPublications: [],
  publicationsToImport: [],
};

const toggleActivePage = (state, retrievedPublications) => {
  if (state.publications.length < pageSize) {
    return 1;
  } else {
    if (state.activePage !== state.totalPages) {
      // they weren't on the latest page
      console.log('in true');
      const totalSize = state.publications.concat(retrievedPublications).length;
      const activePage = Math.ceil(totalSize / pageSize);
      return activePage;
    } else {
      const totalSize = state.publications.concat(retrievedPublications).length;
      const activePage = Math.floor(totalSize / pageSize);
      console.log('in else ' + activePage);
      return activePage + 1;
    }
  }
};

const toggleShownPublications = (state, retrievedPublications) => {
  if (state.publications.length < pageSize) {
    // initial case
    console.log('in true for shown pubs');
    return state.publications.concat(retrievedPublications).slice(0, pageSize);
  } else {
    const totalSize = state.publications.concat(retrievedPublications).length;
    if (retrievedPublications.length < pageSize) {
      // reached end of user's profile
      return state.publications
        .concat(retrievedPublications)
        .slice(totalSize - pageSize, totalSize);
    } else {
      const activePage = Math.floor(totalSize / pageSize);
      console.log('in else for shown publications ' + activePage);
      return state.publications
        .concat(retrievedPublications)
        .slice((activePage - 1) * pageSize, activePage * pageSize);
    }
  }
};

const calculateTotalPages = (state, retrievedPublications) => {
  const totalSize = state.publications.concat(retrievedPublications).length;
  return Math.ceil(totalSize / pageSize);
};

const importedPublicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case IMPORT_REQUEST:
      return { ...state, loading: true };
    case IMPORT_SUCCESS:
      return {
        ...state,
        importStatus: 'SUCCESS',
        loading: false,
        publications: state.publications.concat(action.payload),
        shownPublications: toggleShownPublications(state, action.payload),
        totalPages: calculateTotalPages(state, action.payload),
        activePage: toggleActivePage(state),
        startFrom: state.startFrom + pageSize,
        publicationsToImport: state.publicationsToImport.concat(
          new Array(action.payload.length).fill(true)
        ),
      };
    case IMPORT_FAIL:
      return {
        ...state,
        importStatus: 'FAIL',
        loading: false,
        error: action.payload,
      };
    case IMPORT_CLEAR_STATE:
      return initialState;
    case UPDATE_GSCHOLAR_ID:
      return { ...state, gScholarId: action.payload };
    case IMPORT_END:
      return { ...state, reachedEnd: true };
    case CHANGE_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload.activePage,
        shownPublications: action.payload.shownPublications,
      };
    case UPDATE_PUBLICATIONS_TO_IMPORT:
      return { ...state, publicationsToImport: action.payload };
    default:
      return state;
  }
};

export default importedPublicationReducer;
