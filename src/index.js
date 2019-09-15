// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import './assets/fonts/Roboto-Regular.ttf';
import './index.css';
import { env } from './configs/env';
import { App } from './App';
import * as serviceWorker from './serviceWorker';

Sentry.init({ dsn: env.sentryDSN });

ReactDOM.render(
  <App />,
  // $FlowFixMe
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
