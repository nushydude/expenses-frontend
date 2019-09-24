// @flow
import * as React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { CreateExpense } from './expenses/CreateExpense';
import { CashFlows } from './expenses/CashFlows';
import { CashFlow } from './expenses/CashFlow';
import { CreateIncome } from './incomes/CreateIncome';
import { Income } from './incomes/Income';
import { IncomesList } from './incomes/IncomesList';
import { ManageAccount } from './manageAccount/ManageAccount';
import { Dashboard } from './dashboard/Dashboard';
import { ROUTE } from '../../configs/route';

export function HomePage() {
  return (
    <>
      <Switch>
        <Route exact path={ROUTE.DASHBOARD} component={Dashboard} />

        <Route exact path={ROUTE.EXPENSE_CREATE} component={CreateExpense} />
        <Route exact path={ROUTE.EXPENSE} component={CashFlow} />
        <Route
          exact
          path={ROUTE.EXPENSES}
          component={() => <CashFlows type="EXPENSE" />}
        />

        <Route exact path={ROUTE.INCOME_CREATE} component={CreateIncome} />
        <Route exact path={ROUTE.INCOME} component={Income} />
        <Route exact path={ROUTE.INCOMES} component={IncomesList} />

        <Route exact path={ROUTE.MANAGE_ACCOUNT} component={ManageAccount} />

        <Redirect to={ROUTE.DASHBOARD} />
      </Switch>
    </>
  );
}
