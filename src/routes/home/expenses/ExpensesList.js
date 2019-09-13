// @flow
import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import type { ContextRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { startOfMonth } from 'date-fns';
import { pick } from 'ramda';
import styled from 'styled-components';
import { MdAdd, MdShowChart, MdViewList, MdFilterList } from 'react-icons/md';
import { ROUTE } from '../../../configs/route';
import { ExpenseSearch } from './ExpenseSearch';
import type { SearchOptions } from './ExpenseSearch';
import { formatDateForTables } from '../../../utils/formatDateForTables';
import { formatDateForHeadings } from '../../../utils/formatDateForHeadings';
import { ExpensesTable } from './ExpensesTable';
import { ExpensesChart } from './ExpensesChart';

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

const Button = styled.button`
  border: 1px solid green;
  box-sizing: border-box;
  padding: 8px 16px;
  margin-bottom: 10px;
  color: green;
  font-family: Roboto, sans-serif;
  /*input has OS specific font-family*/
  cursor: pointer;
  font-size: 16px;
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

type Props = {
  ...ContextRouter,
};

const ICON_SIZE = 32;

function getDefaultSearchOptions() {
  const now = new Date();

  return {
    from: startOfMonth(now).toISOString(),
    to: now.toISOString(),
  };
}

export function ExpensesList(props: Props) {
  const [searchOptions, setSearchOptions] = React.useState<SearchOptions>(
    getDefaultSearchOptions(),
  );
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [table, setTable] = React.useState<boolean>(true);
  const [showFilter, setShowFilter] = React.useState<boolean>(false);

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
        <MdAdd
          size={ICON_SIZE}
          onClick={() => props.history.push(ROUTE.CREATE_EXPENSE)}
        />

        {table && (
          <MdShowChart size={ICON_SIZE} onClick={() => setTable(false)} />
        )}

        {!table && (
          <MdViewList size={ICON_SIZE} onClick={() => setTable(true)} />
        )}

        <MdFilterList
          size={ICON_SIZE}
          onClick={() => setShowFilter(!showFilter)}
        />
      </div>

      {showFilter && (
        <ExpenseSearch
          updateOptions={setSearchOptions}
          reset={() => setSearchOptions(getDefaultSearchOptions())}
          loading={dataLoading}
          to={formatDateForTables(new Date(to))}
          from={formatDateForTables(new Date(from))}
          recordsPerPage={recordsPerPage}
        />
      )}

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

      {expenses && expenses.length > 0 && table && (
        <ExpensesTable
          expenses={expenses}
          pageNumber={pageNumber}
          totalPages={totalPages}
          setPageNumber={setPageNumber}
        />
      )}

      {expenses && expenses.length > 0 && !table && (
        <ExpensesChart expenses={expenses} />
      )}
    </Container>
  );
}
