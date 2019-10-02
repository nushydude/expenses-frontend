// @flow
import * as React from 'react';
import type { ContextRouter } from 'react-router-dom';
import { CashFlows } from '../../../components/CashFlows';

type Props = ContextRouter;

export function Expenses(props: Props) {
  return <CashFlows type="EXPENSE" {...props} />;
}
