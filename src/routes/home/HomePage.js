// @flow
import * as React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { CreateExpense } from './expenses/CreateExpense';
import { Expenses } from './expenses/Expenses';
import { Expense } from './expenses/Expense';
import { CreateIncome } from './incomes/CreateIncome';
import { Income } from './incomes/Income';
import { Incomes } from './incomes/Incomes';
import { ManageAccount } from './manageAccount/ManageAccount';
import { Dashboard } from './dashboard/Dashboard';
import { ROUTE } from '../../configs/route';
import { ContentWrapper } from '../../components/layouts/ContentWrapper';

export function HomePage() {
  return (
    <ContentWrapper>
      <Switch>
        <Route exact path={ROUTE.DASHBOARD} component={Dashboard} />

        <Route exact path={ROUTE.EXPENSE_CREATE} component={CreateExpense} />
        <Route exact path={ROUTE.EXPENSE} component={Expense} />
        <Route exact path={ROUTE.EXPENSES} component={Expenses} />

        <Route exact path={ROUTE.INCOME_CREATE} component={CreateIncome} />
        <Route exact path={ROUTE.INCOME} component={Income} />
        <Route exact path={ROUTE.INCOMES} component={Incomes} />

        <Route exact path={ROUTE.MANAGE_ACCOUNT} component={ManageAccount} />

        <Redirect to={ROUTE.DASHBOARD} />
      </Switch>
    </ContentWrapper>
  );
}
