// @flow
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { format } from 'date-fns';
import styled from 'styled-components';

const EXPENSE_QUERY = gql`
  query WEBAPP_GetExpense($input: GetExpenseInput!) {
    expense: getExpense(input: $input) {
      amount
      date
      id
      paymentMethod
      type
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

type Props = {
  match: {
    params: {
      id?: string,
    },
  },
};

export function Expense(props: Props) {
  const expenseID = props.match.params.id || '-1';

  console.log('expenseID:', expenseID);

  const { loading, error, data } = useQuery(EXPENSE_QUERY, {
    variables: {
      input: { expenseID },
    },
    fetchPolicy: 'cache-and-network',
  });

  if (error) {
    return <p>Error {error.message}</p>;
  }

  if (loading && (!data || data.expense === undefined)) {
    return <p>Loading...</p>;
  }

  const { expense } = data;

  if (!expense) {
    return <p>No matching expense found</p>;
  }

  return (
    <Container>
      <div>
        <p>Date</p>
        <p>Type</p>
        <p>Amount</p>
        <p>Payment Method</p>
      </div>
      <div>
        <p>
          {format(new Date(Number.parseInt(expense.date, 10)), 'yyyy-MM-dd')}
        </p>
        <p>{expense.type}</p>
        <p>{Number.parseFloat(expense.amount).toFixed(2)}</p>
        <p>{expense.paymentMethod}</p>
      </div>
    </Container>
  );
}
