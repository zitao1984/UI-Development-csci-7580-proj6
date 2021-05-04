import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { loginReducer } from "./reducers/login";
import { usersReducer } from "./reducers/users";
import { chatReducer } from "./reducers/chats";
import { messageReducer } from "./reducers/messages";
import { filesReducer } from "./reducers/files";
import {loadingReducer} from "./reducers/loading";
const rootReducer = combineReducers({
  loading: loadingReducer,
  login: loginReducer,
  users: usersReducer,
  chats: chatReducer,
  messages: messageReducer,
  files: filesReducer
});

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));
