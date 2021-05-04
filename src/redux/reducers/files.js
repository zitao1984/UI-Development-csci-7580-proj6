import { LOGOUT, STORE_FILES, POPULATE_FILES} from "../actionConstants";

const INITIAL_STATE = {files: []};

export const filesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case POPULATE_FILES:
            console.log("REDUCER REACHED")
            return {
                files: action.payload.files
            }
        case STORE_FILES:
            return [ ...action.payload.files ]
        case LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
}