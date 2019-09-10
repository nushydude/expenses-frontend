// @flow
import * as React from 'react';
import styled from 'styled-components';
import { PaginationControls } from '../../../components/PaginationControls';
import { ROUTE } from '../../../configs/route';
import { formatDateForTables } from '../../../utils/formatDateForTables';
import { Link } from '../../../components/Link';

const Table = styled.table`
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-collapse: collapse;
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

const Td = styled.td`
  padding: 4px;
  text-align: left;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

type Props = {
  expenses: Array<{
    amount: number,
    date: string,
    id: string,
    paymentMethod: string,
    type: string,
  }>,
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
            <Th>Date</Th>
            <Th>Type</Th>
            <Th>Amount</Th>
            <Th>Payment method</Th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <Tr key={expense.id}>
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
