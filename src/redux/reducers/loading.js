import {
    LOADING,
    LOADING_SUCCESS
} from "../actionConstants";
import { STATUS } from "../stateConstants";

const INITIAL_STATE = STATUS.LOADING;

export const loadingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                status: STATUS.LOADING
            }
        case LOADING_SUCCESS:
            return {
                ...state,
                status: STATUS.SUCCESS
            }

        default:
            return state;
    }
};