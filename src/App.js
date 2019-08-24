// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTE } from './configs/route';
import { LogInPage } from './routes/logIn/LogInPage';
import { HomePage } from './routes/home/HomePage';

function App() {
  return (
    <div className="App">
      <p>Header</p>

      <Switch>
        <Route exact path={ROUTE.AUTH_LOGIN} component={LogInPage} />
        <Route path={ROUTE.HOME} component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
