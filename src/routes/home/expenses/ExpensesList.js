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
import { PaginationControls } from '../../../components/PaginationControls';

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
      totalPages
      totalRecordsCount
    }
  }
`;

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const Table = styled.table`
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 10px;
  text-align: left;
  background: #ccc;
`;

const Td = styled.td`
  padding: 10px;
  text-align: left;
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
    totalPages: number,
    totalRecordsCount: number,
  },
};

type Variables = {
  input: {
    to?: string,
    from?: string,
  },
};

const recordsPerPage = 10;

export function ExpensesList() {
  const [searchOptions, setSearchOptions] = React.useState<SearchOptions>({});
  // const [recordsPerPage, setRecordsPerPage] = React.useState<number>(10);
  const [pageNumber, setPageNumber] = React.useState<number>(1);

  const input = {
    ...pick(['from', 'to', 'paymentMethods', 'types'], searchOptions),
    recordsPerPage,
    pageNumber,
  };

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

  const { expenses, totalPages } = data.result;

  if (expenses.length === 0) {
    return <p>You have not entered any expenses yet</p>;
  }

  return (
    <Container>
      <div>
        <Link to={ROUTE.CREATE_EXPENSE}>Create Expense</Link>
      </div>

      <ExpenseSearch updateOptions={setSearchOptions} />

      <Table>
        <thead>
          <tr>
            <Th>Date</Th>
            <Th>Type</Th>
            <Th>Amount</Th>
            <Th>Payment method</Th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.id}>
              <Td>
                <Link to={ROUTE.EXPENSE.replace(':id', expense.id)}>
                  {format(
                    new Date(Number.parseInt(expense.date, 10)),
                    'yyyy-MM-dd',
                  )}
                </Link>
              </Td>
              <Td>{expense.type}</Td>
              <Td>{Number.parseFloat(expense.amount).toFixed(2)}</Td>
              <Td>{expense.paymentMethod}</Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <PaginationControls
        pageNumber={pageNumber}
        totalPages={totalPages}
        setPageNumber={setPageNumber}
      />
    </Container>
  );
}
