// @flow
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { rootReducer } from './rootReducer';

const logger = createLogger();

const middlware = [process.env.NODE_ENV !== 'production' && logger].filter(
  Boolean,
);

const store = createStore(rootReducer, applyMiddleware(...middlware));

export function getStore() {
  return store;
}
