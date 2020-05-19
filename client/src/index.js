import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./Store/reducers";

let store = null;

if (typeof window !== "undefined") {
    const composeEnhancers =
        typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                  // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
              })
            : compose;

    const devEnhancer = composeEnhancers(applyMiddleware(thunk, logger));
    const enhancer = composeEnhancers(applyMiddleware(thunk));

    // Create redux store
    if (process.env.REACT_APP_NODE_ENV !== "production") {
        store = createStore(rootReducer, devEnhancer);
    } else {
        store = createStore(rootReducer, enhancer);
    }

    ReactDOM.render(
      <React.StrictMode>
          <Provider store={store}>
              <Router>
                  <App />
              </Router>
          </Provider>
      </React.StrictMode>,
      document.getElementById("root")
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
