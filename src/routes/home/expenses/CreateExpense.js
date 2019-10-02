// @flow
import * as React from 'react';
import type { ContextRouter } from 'react-router-dom';
import { CreateCashFlow } from '../../../components/CreateCashFlow';
import { ROUTE } from '../../../configs/route';

type Props = ContextRouter;

export function CreateExpense({ history }: Props) {
  return (
    <CreateCashFlow
      type="EXPENSE"
      onSuccess={() => history.push(ROUTE.EXPENSES)}
      onCancel={() => history.goBack()}
    />
  );
}
