// @flow
import invariant from 'invariant';
import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { format } from 'date-fns';
import gql from 'graphql-tag';
import { EditableTextField } from '../../../components/EditableTextField';

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
    <div>
      <label>Date</label>
      <p>{format(new Date(Number.parseInt(expense.date, 10)), 'yyyy-MM-dd')}</p>

      <label>Type</label>
      <EditableTextField
        mutation={UPDATE_EXPENSE_MUTATION}
        field="type"
        value={expense.type}
        getValue={getStringValue('type')}
        getError={getError}
        getVariables={getVariables(expenseID, 'type')}
      />

      <label>Amount</label>
      <EditableTextField
        mutation={UPDATE_EXPENSE_MUTATION}
        field="amount"
        value={expense.amount}
        getValue={getStringValue('amount')}
        getError={getError}
        getVariables={getVariables(expenseID, 'amount', 'float')}
        formatValue={(value: string) =>
          `$ ${Number.parseFloat(value).toFixed(2)}`
        }
      />

      <label>Payment Method</label>
      <EditableTextField
        mutation={UPDATE_EXPENSE_MUTATION}
        field="paymentMethod"
        value={expense.paymentMethod}
        getValue={getStringValue('paymentMethod')}
        getError={getError}
        getVariables={getVariables(expenseID, 'paymentMethod')}
      />

      <label>Notes</label>
      <EditableTextField
        mutation={UPDATE_EXPENSE_MUTATION}
        field="notes"
        value={expense.notes}
        getValue={getStringValue('notes')}
        getError={getError}
        getVariables={getVariables(expenseID, 'notes')}
      />
    </div>
  );
}
