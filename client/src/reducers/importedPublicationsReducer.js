import { IMPORT_REQUEST, IMPORT_SUCCESS, IMPORT_FAIL, IMPORT_CLEAR_STATE } from '../actions/types'

const initialState = {
    loading: false,
    importStatus: null,
    publications: [],
    error: null
}

const importedPublicationReducer = (state=initialState, action) => {
    switch(action.type){
        case IMPORT_REQUEST:
            return {...state, loading: true}
        case IMPORT_SUCCESS:
            return {...state, importStatus: "SUCCESS", loading: false, publications: action.payload}
        case IMPORT_FAIL:
            return { ...state, importStatus: "FAIL", loading: false, error: action.payload}
        case IMPORT_CLEAR_STATE:
            return initialState
        default:
            return state
    }
}

export default importedPublicationReducer