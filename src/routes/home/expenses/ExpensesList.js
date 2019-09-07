// @flow
import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { format } from 'date-fns';
import { pick } from 'ramda';
import styled from 'styled-components';
import { Link } from '../../../components/Link';
import { ROUTE } from '../../../configs/route';
import { ExpenseSearch } from './ExpenseSearch';
import type { SearchOptions } from './ExpenseSearch';

const GET_EXPENSES_QUERY = gql`
  query EXPENSES_GetExpenses($input: GetExpensesInput!) {
    result: getExpenses(input: $input) {
      expenses {
        amount
        date
        id
        notes
        paymentMethod
        type
      }
    }
  }
`;

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

type Data = {
  result: {
    expenses: Array<{
      amount: number,
      date: string,
      id: string,
      paymentMethod: string,
      type: string,
    }>,
  },
};

type Variables = {
  input: {
    to?: string,
    from?: string,
  },
};

export function ExpensesList() {
  const [searchOptions, setSearchOptions] = React.useState<SearchOptions>({});

  const input = pick(['from', 'to', 'paymentMethods', 'types'], searchOptions);

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

  if (
    loading &&
    (!data || !data.result || !Array.isArray(data.result.expenses))
  ) {
    return <p>Loading ...</p>;
  }

  const { expenses } = data.result;

  if (expenses.length === 0) {
    return <p>You have not entered any expenses yet</p>;
  }

  return (
    <Container>
      <div>
        <Link to={ROUTE.CREATE_EXPENSE}>Create Expense</Link>
      </div>

      <ExpenseSearch updateOptions={setSearchOptions} />

      <table>
        <thead>
          <tr>
            <th align="left">Date</th>
            <th align="left">Type</th>
            <th align="left">Amount</th>
            <th align="left">Payment method</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.id}>
              <td>
                <Link to={ROUTE.EXPENSE.replace(':id', expense.id)}>
                  {format(
                    new Date(Number.parseInt(expense.date, 10)),
                    'yyyy-MM-dd',
                  )}
                </Link>
              </td>
              <td>{expense.type}</td>
              <td>{Number.parseFloat(expense.amount).toFixed(2)}</td>
              <td>{expense.paymentMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
