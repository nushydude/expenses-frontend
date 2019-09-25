// @flow
import * as React from 'react';
import styled from 'styled-components';
import { CashFlows } from './CashFlows';

type Props = {};

const PageLayout = styled.div`
  display: flex;
  flex-direction: columnn;
  background: pink;
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: row;
  background: teal;
  align-items: center;
`;

const PageTitle = styled.h2``;

const PageMenu = styled.h2``;

export function ExpensesPage(props: Props) {
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Expensese</PageTitle>
        <PageMenu>...</PageMenu>
      </PageHeader>
      <PageBody>
        <CashFlows type="EXPENSE" />
      </PageBody>
    </PageLayout>
  );
}
