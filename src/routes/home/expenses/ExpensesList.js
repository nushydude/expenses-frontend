// @flow
import { useQuery } from '@apollo/react-hooks';
import { startOfMonth } from 'date-fns';
import gql from 'graphql-tag';
import { pick } from 'ramda';
import * as React from 'react';
import { MdAdd, MdShowChart, MdViewList, MdFilterList } from 'react-icons/md';
import type { ContextRouter } from 'react-router-dom';
import styled from 'styled-components';
import { PageMenu } from '../../../components/PageMenu';
import { ROUTE } from '../../../configs/route';
import { formatDateForTables } from '../../../utils/formatDateForTables';
import { formatDateForHeadings } from '../../../utils/formatDateForHeadings';
import type { SearchOptions } from './ExpenseSearch';
import { ExpenseSearch } from './ExpenseSearch';
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

const PageTitleContainer = styled.div`
  display: flex;
  margin-top: 4px;
  margin-bottom: 8px;
`;

const PageTitle = styled.div`
  flex-grow: 1;
  font-size: 14px;
  font-weight: bold;
`;

const PageMenuItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  cursor: pointer;

  :hover {
    color: #999;
  }
`;

// const Button = styled.button`
//   border: 1px solid green;
//   box-sizing: border-box;
//   padding: 8px 16px;
//   margin-bottom: 10px;
//   color: green;
//   font-family: Roboto, sans-serif;
//   /*input has OS specific font-family*/
//   cursor: pointer;
//   font-size: 16px;
// `;

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

const ICON_SIZE = 20;

function getDefaultSearchOptions() {
  const now = new Date();

  return {
    from: startOfMonth(now).toISOString(),
    to: now.toISOString(),
  };
}

const menuIconStyle = { marginRight: '4px' };

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
      <PageTitleContainer>
        <PageTitle>
          {`From ${formatDateForHeadings(
            new Date(from),
          )} to ${formatDateForHeadings(new Date(to))}`}
        </PageTitle>
        <PageMenu>
          <PageMenuItem
            onClick={() => props.history.push(ROUTE.CREATE_EXPENSE)}
          >
            <MdAdd size={ICON_SIZE} style={menuIconStyle} />
            Add new expense
          </PageMenuItem>

          {table && (
            <PageMenuItem onClick={() => setTable(false)}>
              <MdShowChart size={ICON_SIZE} style={menuIconStyle} />
              Show chart view
            </PageMenuItem>
          )}

          {!table && (
            <PageMenuItem onClick={() => setTable(true)}>
              <MdViewList size={ICON_SIZE} style={menuIconStyle} />
              Show table view
            </PageMenuItem>
          )}

          <PageMenuItem onClick={() => setShowFilter(!showFilter)}>
            <MdFilterList size={ICON_SIZE} style={menuIconStyle} />
            Filter expenses
          </PageMenuItem>
        </PageMenu>
      </PageTitleContainer>

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
