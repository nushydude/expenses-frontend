// @flow
import { format } from 'date-fns';
import gql from 'graphql-tag';
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { CreateCashFlowForm } from './CreateCashFlowForm';
import type { FormFields } from './CreateCashFlowForm';

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

type State = {
  type: 'EXPENSE' | 'INCOME',
  category: string,
  amount: number,
  date: string,
  source: string,
  notes: string,
  error: ?string,
  success: boolean,
};

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

export class CreateCashFlow extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      category: '',
      amount: 0,
      date: format(new Date(), 'yyyy-MM-dd'),
      source: '',
      notes: '',
      type: props.type,
      error: null,
      success: false,
    };
  }

  clearError = () => {
    this.setState({ error: null, success: false });
  };

  handleInputChange = (name: FormFields) => (
    e: SyntheticInputEvent<HTMLInputElement>,
  ) => {
    this.setState({ [name]: e.target.value });
  };

  onCompleted = ({ result }: Data) => {
    const { cashFlow, error } = result;

    if (cashFlow && !error) {
      this.props.onSuccess();
    } else {
      this.setState({
        error: error ? error.message : 'Unknown error',
        success: false,
      });
    }
  };

  onError = ({ message }: Error) => this.setState({ error: message });

  render() {
    const { onCancel, type } = this.props;
    const { error, success, ...fields } = this.state;

    return (
      <Query query={GET_CURRENT_USER_QUERY}>
        {({ data = {} }) => {
          const { result } = data;
          let sources = [];
          let categories = [];

          if (result) {
            sources = result.sources;
            categories = result.categories;
          }

          return (
            <Mutation
              mutation={CREATGE_CASHFLOW_MUTATION}
              onCompleted={this.onCompleted}
              onError={this.onError}
            >
              {(createCashFlow, { loading }) => (
                <CreateCashFlowForm
                  cancel={onCancel}
                  clearError={this.clearError}
                  error={error}
                  isBusy={loading}
                  submit={(e: SyntheticInputEvent<any>) => {
                    e.preventDefault();

                    const { amount, date, ...rest } = fields;
                    const variables = {
                      input: {
                        ...rest,
                        amount:
                          typeof amount === 'string'
                            ? Number.parseFloat(amount)
                            : amount,
                        date: new Date(date).toISOString(),
                        type,
                      },
                    };

                    return createCashFlow({ variables });
                  }}
                  handleInputChange={this.handleInputChange}
                  sources={sources}
                  categories={categories}
                  {...fields}
                />
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}
