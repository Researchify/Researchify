import {
  IMPORT_REQUEST,
  IMPORT_SUCCESS,
  IMPORT_FAIL,
  IMPORT_CLEAR_STATE,
  UPDATE_GSCHOLAR_ID,
  IMPORT_END,
  CHANGE_ACTIVE_PAGE,
} from "../actions/types";

const initialState = {
  loading: false,
  importStatus: null,
  publications: [],
  error: null,
  gScholarId: "",
  startFrom: 0,
  reachedEnd: false,
  totalPages: 0,
  activePage: 0,
  shownPublications: [],
};

const toggleActivePage = (state) => {
    if (state.activePage != state.totalPages) {
        return state.totalPages + 1
    } else {
        return state.activePage + 1
    }
}

const importedPublicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case IMPORT_REQUEST:
      return { ...state, loading: true };
    case IMPORT_SUCCESS:
      return {
        ...state,
        importStatus: "SUCCESS",
        loading: false,
        publications: state.publications.concat(action.payload),
        shownPublications: action.payload,
        totalPages: state.totalPages + 1,
        activePage: toggleActivePage(state),
        startFrom: state.startFrom + action.payload.length
      };
    case IMPORT_FAIL:
      return {
        ...state,
        importStatus: "FAIL",
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
    default:
      return state;
  }
};

export default importedPublicationReducer;
