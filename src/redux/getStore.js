// @flow
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { rootReducer } from './rootReducer';

const logger = createLogger();

const store = createStore(rootReducer, applyMiddleware(logger));

export function getStore() {
  return store;
}
