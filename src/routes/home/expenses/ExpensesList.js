// @flow
import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { format } from 'date-fns';
import { pick } from 'ramda';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../configs/route';

const GET_EXPENSES_QUERY = gql`
  query EXPENSES_GetExpenses($input: GetExpensesInput!) {
    expenses: getExpenses(input: $input) {
      amount
      date
      id
      paymentMethod
      type
    }
  }
`;

type Data = {
  expenses: Array<{
    amount: number,
    date: string,
    id: string,
    paymentMethod: string,
    type: string,
  }>,
};

type Variables = {
  input: {
    to?: string,
    from?: string,
  },
};

type Props = {
  // from?: string,
  // to?: string,
  // paymentMethods?: Array<string>,
  // types?: Array<string>,
};

export function ExpensesList(props: Props) {
  const input = pick(['from', 'to', 'paymentMethods', 'types'], props);

  const { loading, error, data, refetch } = useQuery<Data, Variables>(
    GET_EXPENSES_QUERY,
    {
      variables: { input },
      fetchPolicy: 'cache-and-network',
    },
  );

  if (error) {
    return (
      <>
        <p>An error occurred</p>
        {error.message && <p>{error.message}</p>}
        <button type="button" onClick={refetch}>
          Retry
        </button>
      </>
    );
  }

  if (loading) {
    return <p>Loading ...</p>;
  }

  const { expenses } = data;

  if (expenses.length === 0) {
    return <p>You have not entered any expenses yet</p>;
  }

  return (
    <>
      <div>
        <Link to={ROUTE.CREATE_EXPENSE}>Create Expense</Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Payment method</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.id}>
              <td>
                {format(
                  new Date(Number.parseInt(expense.date, 10)),
                  'yyyy-MM-dd',
                )}
              </td>
              <td>{expense.type}</td>
              <td>{Number.parseFloat(expense.amount).toFixed(2)}</td>
              <td>{expense.paymentMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
