// @flow
import { createLogger } from 'redux-logger';
import { env } from '../configs/env';

const logger = createLogger();

export const middleware = [env.isDev && logger].filter(Boolean);
