// @flow
import { format } from 'date-fns';
import gql from 'graphql-tag';
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { CreateExpenseForm } from './components/CreateExpenseForm';
import { ROUTE } from '../../../configs/route';

const CREATE_EXPENSE_MUTATION = gql`
  mutation EXPENSES_CreateExpense($input: CreateExpenseInput!) {
    result: createExpense(input: $input) {
      expense {
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
      paymentMethods
      types
    }
  }
`;

type Props = {
  history: any,
};

type State = {
  type: string,
  amount: number,
  date: string,
  paymentMethod: string,
  notes: string,
  error: ?string,
  success: boolean,
};

type Data = {
  result: {
    expense: {
      id: string,
    },
    error: ?{
      message: string,
    },
  },
};

export class CreateExpense extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      type: '',
      amount: 0,
      date: format(new Date(), 'yyyy-MM-dd'),
      paymentMethod: '',
      notes: '',
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
    const { expense, error } = result;

    if (expense && !error) {
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
    const { history } = this.props;
    const { error, success, ...fields } = this.state;

    if (success) {
      return <Redirect to={ROUTE.EXPENSES} />;
    }

    return (
      <Mutation
        mutation={CREATE_EXPENSE_MUTATION}
        onCompleted={this.onCompleted}
        onError={this.onError}
      >
        {(createExpense, { loading }) => (
          <Query query={GET_CURRENT_USER_QUERY} fetchPolicy="cache-and-network">
            {({ data = {} }) => {
              const { result } = data;
              let paymentMethods = [];
              let types = [];

              if (result) {
                paymentMethods = result.paymentMethods;
                types = result.types;
              }

              return (
                <CreateExpenseForm
                  cancel={history.goBack}
                  clearError={this.clearError}
                  error={error}
                  isBusy={loading}
                  submit={(e: SyntheticInputEvent<any>) => {
                    e.preventDefault();

                    const { amount, date, ...rest } = fields;

                    return createExpense({
                      variables: {
                        input: {
                          ...rest,
                          amount: Number.parseFloat(amount),
                          date: new Date(date).toISOString(),
                        },
                      },
                    });
                  }}
                  handleInputChange={this.handleInputChange}
                  paymentMethods={paymentMethods}
                  types={types}
                  {...fields}
                />
              );
            }}
          </Query>
        )}
      </Mutation>
    );
  }
}
