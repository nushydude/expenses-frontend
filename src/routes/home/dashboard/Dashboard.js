// @flow
import * as React from 'react';
import styled from 'styled-components';
import type { ContextRouter } from 'react-router-dom';
import { ROUTE } from '../../../configs/route';

const Container = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px 100px 100px 100px;
  grid-gap: 10px;
  background-color: #fff;
  color: #444;
`;

const Box = styled.div`
  background-color: #444;
  color: #fff;
  border-radius: 5px;
  padding: 20px;
  font-size: 150%;
`;

const CreateExpenseBox = styled(Box)`
  grid-column: 1;
  grid-row: 1;
`;

const CreateIncomeBox = styled(Box)`
  grid-column: 1;
  grid-row: 2;
`;

const ThisMonthsExpensesBox = styled(Box)`
  grid-column: 2/7;
  grid-row: 1/3;
`;

type Props = ContextRouter;

export function Dashboard({ history }: Props) {
  return (
    <Container>
      <CreateExpenseBox>
        <button onClick={() => history.push(ROUTE.EXPENSE_CREATE)}>
          Create Expense
        </button>
      </CreateExpenseBox>

      <CreateIncomeBox>
        <button onClick={() => history.push(ROUTE.INCOME_CREATE)}>
          Create Income
        </button>
      </CreateIncomeBox>

      <ThisMonthsExpensesBox />
    </Container>
  );
}
