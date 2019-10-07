// @flow
import { useQuery } from '@apollo/react-hooks';
import { startOfMonth } from 'date-fns';
import gql from 'graphql-tag';
import { pick } from 'ramda';
import * as React from 'react';
import { MdAdd, MdShowChart, MdViewList, MdFilterList } from 'react-icons/md';
import type { ContextRouter } from 'react-router-dom';
import styled from 'styled-components';
import { PageMenu } from './PageMenu';
import { ROUTE } from '../configs/route';
import { formatDateForTables } from '../utils/formatDateForTables';
import { formatDateForHeadings } from '../utils/formatDateForHeadings';
import { CashFlowSearch } from './CashFlowSearch';
import type { SearchOptions } from './CashFlowSearch';
import { CashFlowTable } from './CashFlowTable';

const GET_CASHFLOWS_QUERY = gql`
  query EXPENSES_GetCashFlows($input: GetCashFlowsInput!) {
    result: getCashFlows(input: $input) {
      cashFlows {
        amount
        category
        date
        id
        notes
        source
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
  margin-bottom: 16px;
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

type Data = {
  result: {
    cashFlows: Array<{
      amount: number,
      date: string,
      id: string,
      source: string,
      category: string,
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
  type: 'EXPENSE' | 'INCOME',
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

export function CashFlows(props: Props) {
  const [searchOptions, setSearchOptions] = React.useState<SearchOptions>(
    getDefaultSearchOptions(),
  );
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [showFilter, setShowFilter] = React.useState<boolean>(true);

  const input = {
    ...pick(['from', 'to', 'sources', 'categories'], searchOptions),
    pageNumber,
    type: props.type,
  };

  const { loading, error, data, refetch } = useQuery<Data, Variables>(
    GET_CASHFLOWS_QUERY,
    { variables: { input } },
  );

  const result = data && data.result;
  const dataLoading = loading && !result;
  const cashFlows = result && result.cashFlows;
  const totalPages = result && result.totalPages;
  const { recordsPerPage, from, to } = searchOptions;
  const addCashFlowCaption = `Add new ${
    props.type === 'EXPENSE' ? 'expense' : 'income'
  }`;

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
            onClick={() =>
              props.history.push(
                props.type === 'EXPENSE'
                  ? ROUTE.EXPENSE_CREATE
                  : ROUTE.INCOME_CREATE,
              )
            }
          >
            <MdAdd size={ICON_SIZE} style={menuIconStyle} />
            {addCashFlowCaption}
          </PageMenuItem>

          <PageMenuItem onClick={() => setShowFilter(!showFilter)}>
            <MdFilterList size={ICON_SIZE} style={menuIconStyle} />
            Filter
          </PageMenuItem>
        </PageMenu>
      </PageTitleContainer>

      {showFilter && (
        <CashFlowSearch
          updateOptions={setSearchOptions}
          reset={() => setSearchOptions(getDefaultSearchOptions())}
          loading={dataLoading}
          to={formatDateForTables(new Date(to))}
          from={formatDateForTables(new Date(from))}
          recordsPerPage={recordsPerPage}
          close={() => setShowFilter(false)}
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

      {cashFlows && cashFlows.length === 0 && (
        <p>There are no recorded {props.type} for the selected time period</p>
      )}

      {cashFlows && cashFlows.length > 0 && (
        <CashFlowTable
          cashFlows={cashFlows}
          pageNumber={pageNumber}
          totalPages={totalPages}
          setPageNumber={setPageNumber}
        />
      )}
    </Container>
  );
}
