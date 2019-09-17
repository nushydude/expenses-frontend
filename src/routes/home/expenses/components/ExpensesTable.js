// @flow
import { format } from 'date-fns';
import * as React from 'react';
import styled from 'styled-components';
import { ROUTE } from '../../../../configs/route';
import { PaginationControls } from '../../../../components/PaginationControls';
import { Link } from '../../../../components/Link';

const Table = styled.table`
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-collapse: collapse;
  font-size: 12px;
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
  display: flex;
  flex-direction: column;
`;

type Props = {
  expenses: Array<{
    amount: number,
    date: Date,
    id: string,
    paymentMethod: string,
    type: string,
  }>,
  pageNumber: number,
  totalPages: number,
  setPageNumber: (num: number) => void,
};

export function ExpensesTable({
  expenses,
  pageNumber,
  totalPages,
  setPageNumber,
}: Props) {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th>#</Th>
            <Th>Date</Th>
            <Th>Type</Th>
            <Th>Source</Th>
            <ThRightAligned>Amount</ThRightAligned>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, idx) => (
            <Tr key={expense.id}>
              <TdRightAligned>{idx + 1}</TdRightAligned>
              <Td>
                <Link to={ROUTE.EXPENSE.replace(':id', expense.id)}>
                  {format(new Date(expense.date), 'yyyy-MM-dd')}
                </Link>
              </Td>
              <Td>{expense.type}</Td>
              <Td>{expense.paymentMethod}</Td>
              <TdRightAligned>
                ${Number.parseFloat(expense.amount).toFixed(2)}
              </TdRightAligned>
            </Tr>
          ))}
        </tbody>
      </Table>

      <PaginationControls
        pageNumber={pageNumber}
        totalPages={totalPages}
        setPageNumber={setPageNumber}
      />
    </TableContainer>
  );
}
