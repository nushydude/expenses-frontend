// @flow
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Router } from './components/Router';
import { UnauthedRoute } from './components/UnauthedRoute';
import { AuthedRoute } from './components/AuthedRoute';
import { ROUTE } from './configs/route';
import { ChangePasswordPage } from './routes/auth/changePassword/ChangePasswordPage';
import { LogInPage } from './routes/auth/logIn/LogInPage';
import { SignUpPage } from './routes/auth/signUp/SignUpPage';
import { RecoverPage } from './routes/auth/recover/RecoverPage';
import { VerifyAccountPage } from './routes/auth/verifyAccount/VerifyAccountPage';
import { LandingPage } from './routes/landing/LandingPage';
import { HomePage } from './routes/home/HomePage';
import { Header } from './components/Header';
import { persistor, store } from './redux/store';
import { getApolloClient } from './apollo/getApolloClient';
import { env } from './configs/env';
import styled from 'styled-components';

const ContentsWrapper = styled.div`
  padding: 0 20px;
`;

function AppComp() {
  return (
    <>
      <Header />

      <ContentsWrapper>
        <Switch>
          <UnauthedRoute exact path={ROUTE.AUTH_LOGIN} component={LogInPage} />
          <UnauthedRoute
            exact
            path={ROUTE.AUTH_SIGNUP}
            component={SignUpPage}
          />
          <UnauthedRoute
            exact
            path={ROUTE.AUTH_RECOVER}
            component={RecoverPage}
          />
          <UnauthedRoute
            exact
            path={ROUTE.AUTH_VERIFY}
            component={VerifyAccountPage}
          />
          <UnauthedRoute
            exact
            path={ROUTE.AUTH_CHANGE_PWD}
            component={ChangePasswordPage}
          />

          <AuthedRoute path={ROUTE.HOME} component={HomePage} />

          <Route exact path={ROUTE.LANDING} component={LandingPage} />

          <Redirect to={ROUTE.LANDING} />
        </Switch>
      </ContentsWrapper>
    </>
  );
}

export function App() {
  return (
    <ApolloProvider client={getApolloClient(env.apiURL)}>
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
