import { IMPORT_REQUEST, IMPORT_SUCCESS, IMPORT_FAIL, IMPORT_CLEAR_STATE, UPDATE_GSCHOLAR_ID, UPDATE_START_FROM } from '../actions/types'

const initialState = {
    loading: false,
    importStatus: null,
    publications: [],
    error: null,
    gScholarId: "",
    startFrom: 0
}

const importedPublicationReducer = (state=initialState, action) => {
    switch(action.type){
        case IMPORT_REQUEST:
            return {...state, loading: true}
        case IMPORT_SUCCESS:
            return {...state, importStatus: "SUCCESS", loading: false, publications: state.publications.concat(action.payload)}
        case IMPORT_FAIL:
            return { ...state, importStatus: "FAIL", loading: false, error: action.payload}
        case IMPORT_CLEAR_STATE:
            return initialState
        case UPDATE_GSCHOLAR_ID:
            return {...state, gScholarId: action.payload}
        case UPDATE_START_FROM:
            return {...state, startFrom: action.payload}
        default:
            return state
    }
}

export default importedPublicationReducer