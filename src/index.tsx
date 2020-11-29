import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "bootstrap-utilities";
import "animate.css/animate.css";
import App from "./App";
import { applyMiddleware, compose, createStore } from "redux";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";
import { loadState, saveState } from "./redux/localStorage";
import mainReducer from "./redux/reducer";
import { Provider } from "react-redux";
const config = { blacklist: [""] };
const middlewares = [createStateSyncMiddleware(config)];

const persistedState = loadState();

export const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares)
  // other store enhancers if any
);
const store = createStore(mainReducer, persistedState, enhancer);

store.subscribe(() => {
  saveState(store.getState());
});

initMessageListener(store);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
