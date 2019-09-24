// @flow
import invariant from 'invariant';
import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { EditableTextField } from '../../../components/EditableTextField';
import { EditableDateField } from '../../../components/EditableDateField';

const CASHFLOW_QUERY = gql`
  query WEBAPP_GetCashFlow($input: GetCashFlowInput!) {
    cashFlow: getCashFlow(input: $input) {
      amount
      date
      id
      source
      category
      notes
      type
    }
  }
`;

const UPDATGE_CASH_FLOW_MUTATION = gql`
  mutation WEBAPP_UpdateCashFlow($input: UpdateCashFlowInput!) {
    result: updateCashFlow(input: $input) {
      cashFlow {
        amount
        date
        id
        source
        category
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

  return data.result.cashFlow[field];
};

const getVariables = (
  cashFlowID: string,
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
      cashFlowID,
      [field]: parsedValue,
    },
  };
};

export function CashFlow(props: Props) {
  const cashFlowID = props.match.params.id || '-1';

  const { loading, error, data } = useQuery(CASHFLOW_QUERY, {
    variables: {
      input: { cashFlowID },
    },
    fetchPolicy: 'cache-and-network',
  });

  if (error) {
    return <p>Error {error.message}</p>;
  }

  if (loading && (!data || data.cashFlow === undefined)) {
    return <p>Loading...</p>;
  }

  const { cashFlow } = data;

  if (!cashFlow) {
    return <p>No matching record found</p>;
  }

  return (
    <>
      <FormField>
        <Label>Date</Label>
        <EditableDateField
          mutation={UPDATGE_CASH_FLOW_MUTATION}
          field="date"
          value={cashFlow.date}
          getValue={data => new Date(getStringValue('date')(data))}
          getError={getError}
          getVariables={getVariables(cashFlowID, 'date')}
        />
      </FormField>

      <FormField>
        <Label>Category</Label>
        <EditableTextField
          mutation={UPDATGE_CASH_FLOW_MUTATION}
          field="category"
          value={cashFlow.category}
          getValue={getStringValue('category')}
          getError={getError}
          getVariables={getVariables(cashFlowID, 'category')}
        />
      </FormField>

      <FormField>
        <Label>Amount</Label>
        <EditableTextField
          mutation={UPDATGE_CASH_FLOW_MUTATION}
          field="amount"
          value={cashFlow.amount}
          getValue={getStringValue('amount')}
          getError={getError}
          getVariables={getVariables(cashFlowID, 'amount', 'float')}
        />
      </FormField>

      <FormField>
        <Label>Payment Method</Label>
        <EditableTextField
          mutation={UPDATGE_CASH_FLOW_MUTATION}
          field="source"
          value={cashFlow.source}
          getValue={getStringValue('source')}
          getError={getError}
          getVariables={getVariables(cashFlowID, 'source')}
        />
      </FormField>

      <FormField>
        <Label>Notes</Label>
        <EditableTextField
          mutation={UPDATGE_CASH_FLOW_MUTATION}
          field="notes"
          value={cashFlow.notes}
          getValue={getStringValue('notes')}
          getError={getError}
          getVariables={getVariables(cashFlowID, 'notes')}
        />
      </FormField>
    </>
  );
}
