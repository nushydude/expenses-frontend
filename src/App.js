// @flow
import React from 'react';
import * as Sentry from '@sentry/browser';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Route, Switch } from 'react-router-dom';
import { Router } from './components/Router';
import { UnauthedRouter } from './components/UnauthedRouter';
import { ROUTE } from './configs/route';
import { ChangePasswordPage } from './routes/auth/changePassword/ChangePasswordPage';
import { LogInPage } from './routes/auth/logIn/LogInPage';
import { SignUpPage } from './routes/auth/signUp/SignUpPage';
import { RecoverPage } from './routes/auth/recover/RecoverPage';
import { VerifyAccountPage } from './routes/auth/verifyAccount/VerifyAccountPage';
import { LandingPage } from './routes/landing/LandingPage';
import { Header } from './components/Header';
import { persistor, store } from './redux/store';
import { getApolloClient } from './apollo/getApolloClient';

Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });

function AppComp() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <UnauthedRouter exact path={ROUTE.AUTH_LOGIN} component={LogInPage} />
        <UnauthedRouter exact path={ROUTE.AUTH_SIGNUP} component={SignUpPage} />
        <UnauthedRouter
          exact
          path={ROUTE.AUTH_RECOVER}
          component={RecoverPage}
        />
        <UnauthedRouter
          exact
          path={ROUTE.AUTH_VERIFY}
          component={VerifyAccountPage}
        />
        <UnauthedRouter
          exact
          path={ROUTE.AUTH_CHANGE_PWD}
          component={ChangePasswordPage}
        />

        <Route path={ROUTE.LANDING} component={LandingPage} />
      </Switch>
    </div>
  );
}

export function App() {
  return (
    <ApolloProvider client={getApolloClient(process.env.REACT_APP_API_URL)}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <AppComp />
          </Router>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}
