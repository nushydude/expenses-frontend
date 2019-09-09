// @flow
import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { startOfMonth } from 'date-fns';
import { pick } from 'ramda';
import styled from 'styled-components';
import { Link } from '../../../components/Link';
import { ROUTE } from '../../../configs/route';
import { ExpenseSearch } from './ExpenseSearch';
import type { SearchOptions } from './ExpenseSearch';
import { PaginationControls } from '../../../components/PaginationControls';
import { formatDateForTables } from '../../../utils/formatDateForTables';
import { formatDateForHeadings } from '../../../utils/formatDateForHeadings';

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
  const now = new Date();

  const [searchOptions, setSearchOptions] = React.useState<SearchOptions>({
    from: startOfMonth(now).toISOString(),
    to: now.toISOString(),
  });
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
      fetchPolicy: 'network-only',
    },
  );

  const dataLoading = !error && loading;
  const expenses = !dataLoading && data.result.expenses;
  const totalPages = !dataLoading && data.result.totalPages;
  const { from, to } = searchOptions;

  return (
    <Container>
      <h3>
        {`Data from ${formatDateForHeadings(
          new Date(from),
        )} to ${formatDateForHeadings(new Date(to))}`}
      </h3>

      <Link to={ROUTE.CREATE_EXPENSE}>Create Expense</Link>

      <ExpenseSearch updateOptions={setSearchOptions} loading={dataLoading} />

      {error && (
        <div>
          <p>An error occurred</p>
          {error.message && <p>{error.message}</p>}
          <button type="button" onClick={refetch}>
            Retry
          </button>
        </div>
      )}

      {dataLoading && <p>Loading...</p>}

      {expenses && expenses.length === 0 && (
        <p>There are no recorded expenses for the selected time period</p>
      )}

      {expenses && expenses.length > 0 && (
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
                    {formatDateForTables(
                      new Date(Number.parseInt(expense.date, 10)),
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
      )}

      <PaginationControls
        pageNumber={pageNumber}
        totalPages={totalPages}
        setPageNumber={setPageNumber}
      />
    </Container>
  );
}
