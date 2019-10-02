// @flow
import * as React from 'react';
import { Redirect } from 'react-router-dom';
import type { ContextRouter } from 'react-router-dom';
import { isMongoId } from 'validator';
import { CashFlow } from '../../../components/CashFlow';
import { ROUTE } from '../../../configs/route';

type Props = ContextRouter;

export function Expense({ match }: Props) {
  const id = match.params.id || '';

  if (!isMongoId(id)) {
    return <Redirect to={ROUTE.EXPENSES} />;
  }

  return <CashFlow id={id} />;
}
