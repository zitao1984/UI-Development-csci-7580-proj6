import { POPULATE_MESSAGES, POPULATE_MESSAGES_BY_ID } from "../actionConstants";
const INITIAL_STATE = { messages: [], currentMessages: [] };

export const messageReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case POPULATE_MESSAGES:
      return {
        messages: [...action.payload.messages],
        currentMessages: []
      };

    case POPULATE_MESSAGES_BY_ID:
      return {
        messages: [...state.messages],
        currentMessages: action.payload.currentMessages
      };
    default:
      return state;
  }
};
