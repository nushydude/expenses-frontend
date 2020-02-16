// @flow
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { RecoverForm } from './RecoverForm';
import type { FormFields } from './RecoverForm';
import { CentrePage } from '../../../components/layouts/CentrePage';

const SEND_RESET_PASSWORD_LINK_MUTATION = gql`
  mutation Web_SendResetPasswordLink($input: SendResetPasswordLinkInput!) {
    result: sendResetPasswordLink(input: $input) {
      sent
      error {
        message
      }
    }
  }
`;

type Props = {};

type State = {
  email: string,
  error: ?string,
  success: boolean,
};

type Data = {
  result: {
    sent: boolean,
    error: ?{
      message: string,
    },
  },
};

export class RecoverPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      error: null,
      success: false,
    };
  }

  clearError = () => {
    this.setState({ error: null });
  };

  onChange = (name: FormFields) => (
    e: SyntheticInputEvent<HTMLInputElement>,
  ) => {
    this.setState({ [name]: e.target.value });
  };

  onCompleted = ({ result }: Data) => {
    const { sent, error } = result;

    if (sent && !error) {
      this.setState({ success: true });
    } else {
      this.setState({ error: error ? error.message : 'Unknown error' });
    }
  };

  onError = (error: Error) => this.setState({ error: error.message });

  render() {
    const { email, error, success } = this.state;

    if (success) {
      return (
        <p>
          Recovery email successfully sent. Follow instructions in the email to
          recover your password.
        </p>
      );
    }

    return (
      <Mutation
        mutation={SEND_RESET_PASSWORD_LINK_MUTATION}
        onCompleted={this.onCompleted}
        onError={this.onError}
      >
        {(logIn, { loading }) => (
          <CentrePage>
            <RecoverForm
              isBusy={loading}
              clearError={this.clearError}
              error={error}
              submit={(e: SyntheticInputEvent<any>) => {
                e.preventDefault();

                const variables = { input: { email } };

                return logIn({ variables });
              }}
              onChange={this.onChange}
              email={email}
            />
          </CentrePage>
        )}
      </Mutation>
    );
  }
}
