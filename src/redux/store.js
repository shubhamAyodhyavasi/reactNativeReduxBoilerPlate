import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import logger from 'redux-logger';

import reducers from './reducer';

const analytics = () => (next) => (action) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: action.type,
    payload: action.payload,
  });

  return next(action);
};

const middleWares = [
  thunk,
  process.env.NODE_ENV !== 'production' && logger,
  analytics,
].filter(Boolean);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['test'],
};

const allReducers = combineReducers({
  ...reducers,
});

const enhancer = compose(applyMiddleware(...middleWares));
const persistedReducer = persistReducer(persistConfig, allReducers);

export default () => {
  let store = createStore(
    persistedReducer,
    //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    undefined,
    enhancer,
  );
  let persistor = persistStore(store);
  return {store, persistor};
};
