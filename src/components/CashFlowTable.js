// @flow
import { format } from 'date-fns';
import * as React from 'react';
import styled from 'styled-components';
import { ROUTE } from '../configs/route';
import { TableBottomControls } from './TableBottomControls';
import { Link } from './Link';
import { Loading } from './Loading';

const Table = styled.table`
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-collapse: collapse;
  font-size: 12px;
  width: 100%;
`;

const Tr = styled.tr`
  :nth-child(even) {
    background: #eee;
  }
`;

const Th = styled.th`
  padding: 10px;
  text-align: left;
  background: #ccc;
`;

const ThRightAligned = styled(Th)`
  text-align: right;
`;

const Td = styled.td`
  padding: 2px 4px;
  text-align: left;
  white-space: nowrap;
`;

const TdRightAligned = styled(Td)`
  text-align: right;
`;

const TableContainer = styled.div`
  position: relative;
`;

const LoadingContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

type Props = {
  loading: boolean,
  cashFlows: Array<{
    amount: number,
    date: Date,
    id: string,
    source: string,
    category: string,
    type: string,
  }>,
  pageNumber: number,
  totalPages: number,
  setPageNumber: (num: number) => void,
  recordsPerPage: number,
};

export function CashFlowTable({
  cashFlows,
  pageNumber,
  totalPages,
  setPageNumber,
  loading,
  recordsPerPage,
}: Props) {
  const itemOffset = (pageNumber - 1) * recordsPerPage + 1;

  return (
    <TableContainer>
      {loading && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}

      <Table>
        <thead>
          <tr>
            <Th>#</Th>
            <Th>Date</Th>
            <Th>Category</Th>
            <Th>Source</Th>
            <ThRightAligned>Amount</ThRightAligned>
          </tr>
        </thead>
        <tbody>
          {cashFlows.map((cashFlow, idx) => (
            <Tr key={cashFlow.id}>
              <TdRightAligned>{itemOffset + idx}</TdRightAligned>
              <Td>
                <Link
                  to={(cashFlow.type === 'EXPENSE'
                    ? ROUTE.EXPENSE
                    : ROUTE.INCOME
                  ).replace(':id', cashFlow.id)}
                >
                  {format(new Date(cashFlow.date), 'yyyy-MM-dd')}
                </Link>
              </Td>
              <Td>{cashFlow.category}</Td>
              <Td>{cashFlow.source}</Td>
              <TdRightAligned>${cashFlow.amount.toFixed(2)}</TdRightAligned>
            </Tr>
          ))}
        </tbody>
      </Table>

      <TableBottomControls
        busy={loading}
        pageNumber={pageNumber}
        totalPages={totalPages}
        setPageNumber={setPageNumber}
      />
    </TableContainer>
  );
}
