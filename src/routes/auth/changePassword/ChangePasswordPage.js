// @flow
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import type { Location } from 'react-router-dom';
import queryString from 'query-string';
import { ChangePasswordForm } from './ChangePasswordForm';
import type { FormFields } from './ChangePasswordForm';

const CHANGE_PASSWORD_MUTATION = gql`
  mutation Web_ChangePassword($input: ChangePasswordInput!) {
    result: changePassword(input: $input) {
      passwordChanged
      error {
        message
      }
    }
  }
`;

type Props = {
  location: Location,
};

type FormInputs = {
  password: string,
  confirmPassword: string,
};

type ValidateFields = {
  ...FormInputs,
  secret: ?string,
};

function validateInputs({
  password,
  confirmPassword,
  secret,
}: ValidateFields): ?string {
  if (password.length < 6) {
    return 'Password is too short';
  }

  if (password !== confirmPassword) {
    return 'Password and confirm password fields do not match';
  }

  if (!secret) {
    return 'Unable to validate user. Please use the link provided in your email';
  }

  return null;
}

type State = {
  ...FormInputs,
  error: ?string,
  success: boolean,
};

type Data = {
  result: {
    passwordChanged: boolean,
    error: ?{
      message: string,
    },
  },
};

export class ChangePasswordPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      confirmPassword: '',
      password: '',
      error: null,
      success: false,
    };
  }

  clearError = () => {
    this.setState({ error: null });
  };

  handleInputChange = (name: FormFields) => (
    e: SyntheticInputEvent<HTMLInputElement>,
  ) => {
    this.setState({ [name]: e.target.value });
  };

  onCompleted = ({ result }: Data) => {
    const { passwordChanged, error } = result;

    if (error || !passwordChanged) {
      this.setState({ error: error ? error.message : 'Unknown error' });
    } else if (passwordChanged) {
      this.setState({ success: true });
    }
  };

  onError = (error: Error) => this.setState({ error: error.message });

  changePassword = async (
    changePasswordMutation: (options: any) => Promise<void>,
  ): Promise<?Data> => {
    const { location } = this.props;
    const { password, confirmPassword } = this.state;

    const { secret } = queryString.parse(location.search);

    const error = validateInputs({ password, confirmPassword, secret });

    if (error) {
      this.setState({ error });

      return null;
    }

    const variables = {
      input: {
        confirmPassword,
        password,
        resetPasswordSecret: secret,
      },
    };

    return changePasswordMutation({ variables });
  };

  render() {
    const { error, password, confirmPassword, success } = this.state;

    if (success) {
      return <p>Password changed successfully</p>;
    }

    return (
      <Mutation
        mutation={CHANGE_PASSWORD_MUTATION}
        onCompleted={this.onCompleted}
        onError={this.onError}
      >
        {(changePassword, { loading }) => (
          <div style={{ width: '400px' }}>
            <ChangePasswordForm
              isBusy={loading}
              clearError={this.clearError}
              error={error}
              submit={(e: SyntheticInputEvent<any>) => {
                e.preventDefault();

                return this.changePassword(changePassword);
              }}
              handleInputChange={this.handleInputChange}
              password={password}
              confirmPassword={confirmPassword}
            />
          </div>
        )}
      </Mutation>
    );
  }
}
