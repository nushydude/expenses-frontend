// @flow
import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CreateExpenseForm } from './CreateExpenseForm';

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

type Props = {};

type State = {
  type: string,
  amount: number,
  date: string,
  paymentMethod: string,
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
      date: '',
      paymentMethod: '',
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
    const { error, success, ...fields } = this.state;

    return (
      <>
        {success && <p>Expense successfully created</p>}

        <Mutation
          mutation={CREATE_EXPENSE_MUTATION}
          onCompleted={this.onCompleted}
          onError={this.onError}
        >
          {(createExpense, { loading }) => (
            <div style={{ width: '600px' }}>
              <CreateExpenseForm
                isBusy={loading}
                clearError={this.clearError}
                error={error}
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
                {...fields}
              />
            </div>
          )}
        </Mutation>
      </>
    );
  }
}
