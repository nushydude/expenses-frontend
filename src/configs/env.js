// @flow
import invariant from 'invariant';

const apiURL = process.env.REACT_APP_API_URL;
const sentryDSN = process.env.REACT_APP_SENTRY_DSN;

invariant(apiURL, 'REACT_APP_API_URL env var should be defined');
invariant(sentryDSN, 'REACT_APP_SENTRY_DSN env var should be defined');

export const env = {
  apiURL,
  sentryDSN,
  isDev: Boolean(process.env.NODE_ENV),
};
