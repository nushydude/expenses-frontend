// @flow
import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './rootReducer';
import { middleware } from './middleware';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(...middleware));

export const persistor = persistStore(store);
