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
import { formatDateForTables } from '../../../utils/formatDateForTables';
import { formatDateForHeadings } from '../../../utils/formatDateForHeadings';
import { ExpensesTable } from './ExpensesTable';

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

export function ExpensesList() {
  const now = new Date();

  const [searchOptions, setSearchOptions] = React.useState<SearchOptions>({
    from: startOfMonth(now).toISOString(),
    to: now.toISOString(),
  });
  const [pageNumber, setPageNumber] = React.useState<number>(1);

  const input = {
    ...pick(['from', 'to', 'paymentMethods', 'types'], searchOptions),
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
  const { recordsPerPage, from, to } = searchOptions;

  return (
    <Container>
      <h3>
        {`From ${formatDateForHeadings(
          new Date(from),
        )} to ${formatDateForHeadings(new Date(to))}`}
      </h3>

      <div>
        <Link to={ROUTE.CREATE_EXPENSE} button>
          Add New
        </Link>
      </div>

      <ExpenseSearch
        updateOptions={setSearchOptions}
        loading={dataLoading}
        to={formatDateForTables(new Date(to))}
        from={formatDateForTables(new Date(from))}
        recordsPerPage={recordsPerPage}
      />

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
        <ExpensesTable
          expenses={expenses}
          pageNumber={pageNumber}
          totalPages={totalPages}
          setPageNumber={setPageNumber}
        />
      )}
    </Container>
  );
}
