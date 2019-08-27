// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTE } from './configs/route';
import { ChangePasswordPage } from './routes/auth/changePassword/ChangePasswordPage';
import { LogInPage } from './routes/auth/logIn/LogInPage';
import { SignUpPage } from './routes/auth/signUp/SignUpPage';
import { RecoverPage } from './routes/auth/recover/RecoverPage';
import { VerifyAccountPage } from './routes/auth/verifyAccount/VerifyAccountPage';
import { LandingPage } from './routes/landing/LandingPage';
import { Header } from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route exact path={ROUTE.AUTH_LOGIN} component={LogInPage} />
        <Route exact path={ROUTE.AUTH_SIGNUP} component={SignUpPage} />
        <Route exact path={ROUTE.AUTH_RECOVER} component={RecoverPage} />
        <Route exact path={ROUTE.AUTH_VERIFY} component={VerifyAccountPage} />
        <Route
          exact
          path={ROUTE.AUTH_CHANGE_PWD}
          component={ChangePasswordPage}
        />

        <Route path={ROUTE.LANDING} component={LandingPage} />
      </Switch>
    </div>
  );
}

export default App;
