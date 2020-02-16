// @flow
import { format } from 'date-fns';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CreateCashFlowForm } from './CreateCashFlowForm';
// import type { FormFields } from './CreateCashFlowForm';

const CREATGE_CASHFLOW_MUTATION = gql`
  mutation EXPENSES_CreateCashFlow($input: CreateCashFlowInput!) {
    result: createCashFlow(input: $input) {
      cashFlow {
        id
      }
      error {
        message
      }
    }
  }
`;

const GET_CURRENT_USER_QUERY = gql`
  query EXPENSES_GetCurrentUser {
    result: getCurrentUser(input: {}) {
      id
      sources
      categories
    }
  }
`;

type Props = {
  type: 'EXPENSE' | 'INCOME',
  onSuccess: () => void,
  onCancel: () => void,
};

// type State = {
//   type: 'EXPENSE' | 'INCOME',
//   category: string,
//   amount: number,
//   date: string,
//   source: string,
//   notes: string,
//   error: ?string,
//   success: boolean,
// };

type Data = {
  result: {
    cashFlow: {
      id: string,
    },
    error: ?{
      message: string,
    },
  },
};

export function CreateCashFlow(props: Props) {
  let sources = [];
  let categories = [];

  // const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [formState, setFormState] = useState({
    type: props.type,
    category: '',
    amount: 0,
    date: format(new Date(), 'yyyy-MM-dd'),
    source: '',
    notes: '',
  });

  const { data: queryData } = useQuery(GET_CURRENT_USER_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  const [createCashFlow, { loading }] = useMutation(CREATGE_CASHFLOW_MUTATION, {
    onError: (error: Error) => setError(error.message),
    onCompleted: (data: Data) => {
      const { cashFlow, error } = data.result;

      if (cashFlow) {
        props.onSuccess();
      } else {
        setError(error ? error.message : 'Unknown error');
      }
    },
  });

  if (queryData && queryData.result) {
    sources = queryData.result.sources || [];
    categories = queryData.result.categories || [];
  }

  return (
    <CreateCashFlowForm
      cancel={props.onCancel}
      clearError={() => setError(null)}
      error={error}
      isBusy={loading}
      submit={(e: SyntheticInputEvent<any>): Promise<void> => {
        e.preventDefault();

        const { amount, date, ...rest } = formState;

        const variables = {
          input: {
            ...rest,
            amount:
              typeof amount === 'string' ? Number.parseFloat(amount) : amount,
            date: new Date(date).toISOString(),
          },
        };

        return createCashFlow({ variables });
      }}
      onChange={(e: SyntheticInputEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormState({ ...formState, [name]: value });
      }}
      sources={sources}
      categories={categories}
      {...formState}
    />
  );
}
