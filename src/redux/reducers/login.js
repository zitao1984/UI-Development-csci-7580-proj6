import {
  LOGIN_SUCCESS,
  INVALID_LOGIN,
  LOGIN_NETWORK_ERROR,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_EXISTED, COMPLETE_ONBOARDING
} from "../actionConstants";
import { LOGIN_STATE } from "../stateConstants";

const INITIAL_STATE = {status: LOGIN_STATE.LOGGED_OUT, user: {onboardingStatus: false}};

export const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COMPLETE_ONBOARDING:
      console.log('ONBOARDING REDUCER REACHED', state.user)
      return {
        status: LOGIN_STATE.LOGGED_IN,
        user: action.payload.user
      }
    case LOGIN_SUCCESS:
      return {
        status: LOGIN_STATE.LOGGED_IN,
        user: action.payload.user,
      };
    case INVALID_LOGIN:
      return {
        status: LOGIN_STATE.INVALID_LOGIN,
      };
    case LOGIN_NETWORK_ERROR:
      return {
        status: LOGIN_STATE.NETWORK_ERROR,
      };
    case LOGOUT:
      return {
        status: LOGIN_STATE.LOGGED_OUT,
        user: action.payload.user
      }

    case REGISTER_SUCCESS:
      return {
        status: LOGIN_STATE.REGISTER_SUCCESS
      }
    case REGISTER_FAIL:
      return {
        status: LOGIN_STATE.REGISTER_FAIL
      }
    case REGISTER_EXISTED:
      return {
        status: LOGIN_STATE.REGISTER_EXISTED
      }
    default:
      return state;
  }
};