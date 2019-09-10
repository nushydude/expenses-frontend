// @flow
import * as React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { Expense } from './expenses/Expense';
import { ExpensesList } from './expenses/ExpensesList';
import { CreateExpense } from './expenses/CreateExpense';
import { ManageAccount } from './manageAccount/ManageAccount';
import { ROUTE } from '../../configs/route';

export function HomePage() {
  return (
    <>
      <Switch>
        <Route exact path={ROUTE.CREATE_EXPENSE} component={CreateExpense} />
        <Route exact path={ROUTE.EXPENSE} component={Expense} />
        <Route exact path={ROUTE.EXPENSES} component={ExpensesList} />

        <Route exact path={ROUTE.MANAGE_ACCOUNT} component={ManageAccount} />

        <Redirect to={ROUTE.EXPENSES} />
      </Switch>
    </>
  );
}
