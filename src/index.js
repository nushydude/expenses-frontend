
// @flow
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from './components/Router';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { getStore } from './redux/getStore';
import { getApolloClient } from './apollo/getApolloClient';

ReactDOM.render(
  <ApolloProvider client={getApolloClient(process.env.REACT_APP_API_URL)}>
    <Provider store={getStore()}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
