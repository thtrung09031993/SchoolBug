import { applyMiddleware, createStore, combineReducers } from "redux";
import apiMiddleware from "utils/api-middleware";
import reactotron from "utils/reactotron";

import { languageReducer } from "common/language/language.reducer";
import { loadingReducer } from "common/loading/loading.reducer";
import { notificationPopupReducer } from "common/notification-popup/notification-popup.reducer";
import { LANGUAGE_STORE, LOADING_STORE, NOTIFICATION_STORE } from "constants/store";

const createStoreWithMiddleware = __DEV__
  ? applyMiddleware(apiMiddleware)(reactotron.createStore)
  : applyMiddleware(apiMiddleware)(createStore);
// const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore);
const initialState =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

class Store {
  constructor() {
    if (!Store.instance) {
      Store.instance = this;
    }

    return Store.instance;
  }

  // Create new store with initial config
  configureStore() {
    this.store = createStoreWithMiddleware(this.createReducer(), initialState);
    this.store.asyncReducers = {};

    return this.store;
  }

  // Create reducer with async reducers and other default reducers
  createReducer = asyncReducers => {
    return combineReducers({
      ...asyncReducers,
      [LANGUAGE_STORE]: languageReducer,
      [LOADING_STORE]: loadingReducer,
      [NOTIFICATION_STORE]: notificationPopupReducer
    });
  };

  // Add new reducer to async reducers
  injectReducer = (name, asyncReducer) => {
    this.store.asyncReducers[name] = asyncReducer;
    this.store.replaceReducer(this.createReducer(this.store.asyncReducers));
  };
}

export default new Store();
