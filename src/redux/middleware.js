// @flow
import { createLogger } from 'redux-logger';

const logger = createLogger();

export const middleware = [process.env.NODE_ENV !== 'production' && logger].filter(
  Boolean,
);
