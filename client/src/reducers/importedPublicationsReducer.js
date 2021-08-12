import {
  IMPORT_REQUEST,
  IMPORT_SUCCESS,
  IMPORT_FAIL,
  IMPORT_CLEAR_STATE,
  UPDATE_GSCHOLAR_ID,
  IMPORT_END,
  CHANGE_ACTIVE_PAGE,
  UPDATE_PUBLICATIONS_TO_IMPORT,
  IMPORT_EMPTY,
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
  const totalSize = state.publications.concat(retrievedPublications).length;
  if (state.activePage !== state.totalPages) {
    // they weren't on the latest page so put them on the latest page
    return Math.ceil(totalSize / pageSize) + 1;
  } else {
    // they were on the latest page so increment by 1
    return Math.floor(totalSize / pageSize) + 1;
  }
};

const toggleShownPublications = (state, retrievedPublications) => {
  if (state.publications.length < pageSize) {
    // initial case if there are less publications to show than the page size
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
      return { ...state, reachedEnd: true, loading: false };
    case CHANGE_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload.activePage,
        shownPublications: action.payload.shownPublications,
      };
    case UPDATE_PUBLICATIONS_TO_IMPORT:
      return { ...state, publicationsToImport: action.payload };
    case IMPORT_EMPTY:
      return {
        ...state,
        importStatus: 'SUCCESS',
        loading: false,
        startFrom: state.startFrom + pageSize,
      };
    default:
      return state;
  }
};

export default importedPublicationReducer;
