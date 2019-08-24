// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTE } from './configs/route';
import { LogInPage } from './routes/auth/logIn/LogInPage';
import { SignUpPage } from './routes/auth/signUp/SignUpPage';
import { RecoverPage } from './routes/auth/recover/RecoverPage';
import { HomePage } from './routes/home/HomePage';

function App() {
  return (
    <div className="App">
      <p>Header</p>

      <Switch>
        <Route exact path={ROUTE.AUTH_LOGIN} component={LogInPage} />
        <Route exact path={ROUTE.AUTH_SIGNUP} component={SignUpPage} />
        <Route exact path={ROUTE.AUTH_RECOVER} component={RecoverPage} />

        <Route path={ROUTE.HOME} component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
