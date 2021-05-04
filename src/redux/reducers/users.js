import { COMPLETE_ONBOARDING, POPULATE_USERS } from "../actionConstants";
const INITIAL_STATE = { users: [] };

export const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case POPULATE_USERS:
      return {
        users: action.payload.users,
      };
    default:
      return state;
  }
};
