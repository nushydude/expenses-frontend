// @flow
import * as React from 'react';
import type { ContextRouter } from 'react-router-dom';
import { CreateCashFlow } from '../../../components/CreateCashFlow';

type Props = ContextRouter;

export function CreateIncome({ history }: Props) {
  return (
    <CreateCashFlow
      type="INCOME"
      onSuccess={() => history.goBack()}
      onCancel={() => history.goBack()}
    />
  );
}
