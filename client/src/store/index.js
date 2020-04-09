import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import auth from './auth';
import notifications from './notifications';
import news from './news';
import adminPanel from './adminPanel';
import chat from './chat';

const rootReducer = combineReducers({
  auth,
  notifications,
  news,
  adminPanel,
  chat
});

const createAppStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : noop => noop
    )
  );

  return store;
};

export default createAppStore;
