// @flow
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { ChangePasswordForm } from './ChangePasswordForm';
import { ROUTE } from '../../../configs/route';
import { Redirect } from 'react-router-dom';
import { isAuthed } from '../../../redux/selectors/auth';
import type { AppState } from '../../../redux/types';
import queryString from 'query-string';


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
  authed: boolean,
};

type FormInputs =  {
  password: string,
  confirmPassword: string,
}

type ValidateFields = {
  ...FormInput,
  secret: ?string,
};

type State = {
  ...FormInputs,
  error: ?string,
  success: boolean,
};

export type FormFields = 'password' | 'confirmPassword';

type Data = {
  result: {
    passwordChanged: boolean,
    error: ?{
      message: string,
    },
  },
};

export class ChangePasswordComp extends React.Component<Props, State> {
  state = {
    confirmPassword: '',
    password: '',
    error: null,
    success: false,
  };

  clearError = () => {
    this.setState({ error: null });
  }

  handleInputChange = (name: FormFields) => (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ [name]: e.target.value });
  }

  onCompleted = ({ result }: Data) => {
    const { passwordChanged, error } = result;

    if (error || !passwordChanged) {
      this.setState({ error: error ? error.message : 'Unknown error' });
    } else if (passwordChanged) {
      this.setState({ success: true });
    }
  }

  onError = (error: Error) => this.setState({ error: error.message });

  signUp = (signUpMutation) => {
    const { password, confirmPassword } = this.state;

    const { secret } = queryString.parse(props.location.search);

    const error = validateInputs({ password, confirmPassword, secret });

    if (error) {
      return this.setState({ error });
    }

    const variables = {
      input: {
        confirmPassword,
        password,
        resetPasswordSecret: secret,
      },
    };

    signUpMutation({ variables });
  }

  render() {
    if (this.props.authed) {
      return <Redirect to={ROUTE.HOME} />;
    }

    if (this.state.success) {
      return <p>Password changed successfully</p>;
    }

    return (
      <Mutation
        mutation={CHANGE_PASSWORD_MUTATION}
        onCompleted={this.onCompleted}
        onError={this.onError}
      >
        {(signUp, { loading }) => (
          <div style={{width: '400px'}}>
            <ChangePasswordForm
              isBusy={loading}
              clearError={this.clearError}
              error={this.state.error}
              submit={(e: SyntheticEvent<any>) => {
                e.preventDefault();

                this.signUp(signUp);
              }}
              handleInputChange={this.handleInputChange}
              password={this.state.password}
              confirmPassword={this.state.confirmPassword}
            />
          </div>
        )}
      </Mutation>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    authed: isAuthed(state),
  };
}

export const ChangePassword = connect(mapStateToProps)(ChangePasswordComp);

function validateInputs({ password, confirmPassword }: FormInputs): ?string {
  if (password.length < 6) {
    return 'Password is too short';
  }

  if (password !== confirmPassword) {
    return 'Password and confirm password fields do not match';
  }

  if (!secret) {
    return 'Please use the link provided in your email';
  }

  return null;
}