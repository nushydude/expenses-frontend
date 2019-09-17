// @flow
import invariant from 'invariant';
import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { format } from 'date-fns';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { EditableTextField } from '../../../components/EditableTextField';
import { EditableDateField } from '../../../components/EditableDateField';

const EXPENSE_QUERY = gql`
  query WEBAPP_GetExpense($input: GetExpenseInput!) {
    expense: getExpense(input: $input) {
      amount
      date
      id
      paymentMethod
      type
      notes
    }
  }
`;

const UPDATE_EXPENSE_MUTATION = gql`
  mutation WEBAPP_UpdateExpense($input: UpdateExpenseInput!) {
    result: updateExpense(input: $input) {
      expense {
        amount
        date
        id
        paymentMethod
        type
        notes
      }
      error {
        message
      }
    }
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  flex-wrap: wrap;
  align-items: left;
  flex-grow: 1;
  border-bottom: 1px solid #eee;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const Label = styled.label`
  font: 14px roboto, sans-serif;
  font-weight: bold;
  margin: 0;
  margin-right: 4px;
  user-select: none;
  width: 120px;
  white-space: nowrap;
`;

type Props = {
  match: {
    params: {
      id?: string,
    },
  },
};

const getError = data => {
  if (!data || !data.result || !data.result.error) {
    return null;
  }

  return new Error(data.result.error.message);
};

const getStringValue = (field: string) => (data): string => {
  invariant(!getError(data), 'Should check for error first');

  return data.result.expense[field];
};

const getVariables = (
  expenseID: string,
  field: string,
  type: string = 'string',
) => (value: string) => {
  let parsedValue: any = value;

  if (type === 'int') {
    parsedValue = parseInt(value);
  } else if (type === 'float') {
    parsedValue = parseFloat(value);
  } else if (type === 'date') {
    parsedValue = new Date(value).toISOString();
  }

  return {
    input: {
      expenseID,
      [field]: parsedValue,
    },
  };
};

export function Expense(props: Props) {
  const expenseID = props.match.params.id || '-1';

  const { loading, error, data } = useQuery(EXPENSE_QUERY, {
    variables: {
      input: { expenseID },
    },
    fetchPolicy: 'cache-and-network',
  });

  if (error) {
    return <p>Error {error.message}</p>;
  }

  if (loading && (!data || data.expense === undefined)) {
    return <p>Loading...</p>;
  }

  const { expense } = data;

  if (!expense) {
    return <p>No matching expense found</p>;
  }

  return (
    <>
      <FormField>
        <Label>Date</Label>
        <EditableDateField
          mutation={UPDATE_EXPENSE_MUTATION}
          field="date"
          value={expense.date}
          getValue={data => new Date(getStringValue('date')(data))}
          getError={getError}
          getVariables={getVariables(expenseID, 'date')}
        />
      </FormField>

      <FormField>
        <Label>Type</Label>
        <EditableTextField
          mutation={UPDATE_EXPENSE_MUTATION}
          field="type"
          value={expense.type}
          getValue={getStringValue('type')}
          getError={getError}
          getVariables={getVariables(expenseID, 'type')}
        />
      </FormField>

      <FormField>
        <Label>Amount</Label>
        <EditableTextField
          mutation={UPDATE_EXPENSE_MUTATION}
          field="amount"
          value={expense.amount}
          getValue={getStringValue('amount')}
          getError={getError}
          getVariables={getVariables(expenseID, 'amount', 'float')}
        />
      </FormField>

      <FormField>
        <Label>Payment Method</Label>
        <EditableTextField
          mutation={UPDATE_EXPENSE_MUTATION}
          field="paymentMethod"
          value={expense.paymentMethod}
          getValue={getStringValue('paymentMethod')}
          getError={getError}
          getVariables={getVariables(expenseID, 'paymentMethod')}
        />
      </FormField>

      <FormField>
        <Label>Notes</Label>
        <EditableTextField
          mutation={UPDATE_EXPENSE_MUTATION}
          field="notes"
          value={expense.notes}
          getValue={getStringValue('notes')}
          getError={getError}
          getVariables={getVariables(expenseID, 'notes')}
        />
      </FormField>
    </>
  );
}
