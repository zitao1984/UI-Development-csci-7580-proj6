import React from "react";
import ReactDOM from "react-dom";
import App from "./views/App";
import store from "../src/redux/store"; // The store and main reducer
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux"; // Automatically passes the store to all child components

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
