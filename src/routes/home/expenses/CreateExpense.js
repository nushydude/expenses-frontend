// @flow
import * as React from 'react';
import type { ContextRouter } from 'react-router-dom';
import { CreateCashFlow } from '../../../components/CreateCashFlow';

type Props = ContextRouter;

export function CreateExpense({ history }: Props) {
  return (
    <CreateCashFlow
      type="EXPENSE"
      onSuccess={() => history.goBack()}
      onCancel={() => history.goBack()}
    />
  );
}
