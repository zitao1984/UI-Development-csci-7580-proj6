import {ADD_PEOPLE_TO_CHAT,DELETE_CHATS, POPULATE_CHATS,DELETE_PEOPLE_FROM_CHAT} from "../actionConstants";
const INITIAL_STATE = { chats: []};

export const chatReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case POPULATE_CHATS:
      return {
        chats: action.payload.chats,
      };
    case DELETE_CHATS:
      return {
        chats: action.payload.chats,
      };
    case ADD_PEOPLE_TO_CHAT:
      return {
        chats: action.payload.chats,
      };
    case DELETE_PEOPLE_FROM_CHAT:
      return {
        chats: action.payload.chats,
      };
    default:
      return state;
  }
};
