import {
  IMPORT_REQUEST,
  IMPORT_SUCCESS,
  IMPORT_FAIL,
  IMPORT_CLEAR_STATE,
  UPDATE_GSCHOLAR_ID,
  IMPORT_END,
  UPDATE_PUBLICATIONS_TO_IMPORT,
  IMPORT_EMPTY,
  RESET_TEAM_DATA,
} from '../actions/types';
import { pageSize } from '../config/publications';

const initialState = {
  loading: false,
  importStatus: null,
  publications: [],
  gScholarId: '',
  startFrom: 0,
  reachedEnd: false,
  publicationsToImport: [],
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
        startFrom: state.startFrom + pageSize,
        publicationsToImport: state.publicationsToImport.concat(
          new Array(action.payload.length).fill(true),
        ),
      };
    case IMPORT_FAIL:
      return {
        ...state,
        importStatus: 'FAIL',
        loading: false,
      };
    case IMPORT_CLEAR_STATE:
      return initialState;
    case UPDATE_GSCHOLAR_ID:
      return { ...state, gScholarId: action.payload };
    case IMPORT_END:
      return { ...state, reachedEnd: true, loading: false };
    case UPDATE_PUBLICATIONS_TO_IMPORT:
      return { ...state, publicationsToImport: action.payload };
    case IMPORT_EMPTY:
      return {
        ...state,
        importStatus: 'SUCCESS',
        loading: false,
        startFrom: state.startFrom + pageSize,
      };
    case RESET_TEAM_DATA:
      return initialState;
    default:
      return state;
  }
};

export default importedPublicationReducer;
