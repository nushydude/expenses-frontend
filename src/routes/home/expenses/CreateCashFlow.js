// @flow
import { format } from 'date-fns';
import gql from 'graphql-tag';
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { CreateCashFlowForm } from './CreateCashFlowForm';
import { ROUTE } from '../../../configs/route';

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
  history: any,
  type: 'EXPENSE' | 'INCOME',
};

type State = {
  type: string,
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
      this.setState({ success: true });
    } else {
      this.setState({
        error: error ? error.message : 'Unknown error',
        success: false,
      });
    }
  };

  onError = ({ message }: Error) => this.setState({ error: message });

  render() {
    const { history, type } = this.props;
    const { error, success, ...fields } = this.state;

    if (success) {
      return (
        <Redirect to={type === 'EXPENSE' ? ROUTE.EXPENSES : ROUTE.INCOMES} />
      );
    }

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
                  cancel={history.goBack}
                  clearError={this.clearError}
                  error={error}
                  isBusy={loading}
                  submit={(e: SyntheticInputEvent<any>) => {
                    e.preventDefault();

                    const { amount, date, ...rest } = fields;
                    const variables = {
                      input: {
                        ...rest,
                        amount: Number.parseFloat(amount),
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
