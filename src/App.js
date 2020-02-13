// @flow
import { ApolloClient } from 'apollo-client';
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

type Props = {};

type State = {
  apolloClient: ?ApolloClient,
};

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      apolloClient: null,
    };
  }

  async componentDidMount() {
    const apolloClient = await getApolloClient(env.apiURL);

    this.setState({ apolloClient });
  }

  render() {
    const { apolloClient } = this.state;

    if (!apolloClient) {
      return <p>Loading...</p>;
    }

    return (
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router>
              <Header />

              <Switch>
                <UnauthedRoute
                  exact
                  path={ROUTE.AUTH_LOGIN}
                  component={LogInPage}
                />
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
            </Router>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    );
  }
}
