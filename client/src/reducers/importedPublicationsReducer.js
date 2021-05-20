
const initialState = {
    loading: false,
    importStatus: null,
    publications: [],
    error: null
}

const importedPublciationReducer = (state=initialState, action) => {
    switch(action.type){
        case "IMPORT_REQUEST":
            return {...state, loading: true}
        case "IMPORT_SUCCESS":
            return {...state, importStatus: "SUCCESS", loading: false, publications: action.payload}
        case "IMPORT_FAIL":
            return { ...state, importStatus: "FAIL", loading: false, error: action.payload}
        case "CLEAR_IMPORT":
            return {...state, importStatus: null}
        default:
            return state
    }
}

export default importedPublciationReducer