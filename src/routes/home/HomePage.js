// @flow
import * as React from 'react';
import { ExpensesList } from './expenses/ExpensesList';
import { CreateExpense } from './expenses/CreateExpense';
import { Switch, Redirect, Route } from 'react-router-dom';
import { ROUTE } from '../../configs/route';

export function HomePage() {
  return (
    <div>
      <h1>Home page</h1>

      <Switch>
        <Route exact path={ROUTE.CREATE_EXPENSE} component={CreateExpense} />
        <Route exact path={ROUTE.EXPENSES} component={ExpensesList} />

        <Redirect to={ROUTE.EXPENSES} />
      </Switch>
    </div>
  );
}
