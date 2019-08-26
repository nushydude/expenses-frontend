// @flow
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isEmail } from 'validator';
import { SignUpForm } from './SignUpForm';
import { ROUTE } from '../../../configs/route';
import { isAuthed } from '../../../redux/selectors/auth';
import type { AppState } from '../../../redux/types';

const SIGNUP_WITH_EMAIL_MUTATION = gql`
  mutation Web_SignUpWithEmail($input: SignUpWithEmailInput!) {
    result: signUpWithEmail(input: $input) {
      created
      error {
        message
      }
    }
  }
`;

type Props = {
  authed: boolean,
};

type FormInputs = {
  email: string,
  name: string,
  password: string,
  confirmPassword: string,
};

type State = {
  ...FormInputs,
  error: ?string,
  success: boolean,
};

export type FormFields = 'email' | 'password' | 'name' | 'confirmPassword';

type Data = {
  result: {
    created: boolean,
    error: ?{
      message: string,
    },
  },
};

export class SignUpPageComp extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
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
    e: SyntheticEvent<HTMLInputElement>,
  ) => {
    this.setState({ [name]: e.target.value });
  };

  onCompleted = ({ result }: Data) => {
    const { created, error } = result;

    if (error || !created) {
      this.setState({ error: error ? error.message : 'Unknown error' });
    } else if (created) {
      this.setState({ success: true });
    }
  };

  onError = (error: Error) => this.setState({ error: error.message });

  signUp = (signUpMutation) => {
    const { email, name, confirmPassword, password } = this.state;

    const error = validateInputs({
      email,
      name,
      password,
      confirmPassword,
    });

    if (error) {
      return this.setState({ error });
    }

    const variables = { input: { email, name, password } };

    signUpMutation({ variables });
  }

  render() {
    const { authed } = this.props;
    const { email, name, confirmPassword, error, password, success } = this.state;

    if (authed) {
      return <Redirect to={ROUTE.HOME} />;
    }

    if (success) {
      return (
        <p>
          Sign up successful. Your account needs to be verified before you can
          log in. Check your email.
        </p>
      );
    }

    return (
      <Mutation
        mutation={SIGNUP_WITH_EMAIL_MUTATION}
        onCompleted={this.onCompleted}
        onError={this.onError}
      >
        {(signUpMutation, { loading }) => (
          <div style={{ width: '400px' }}>
            <SignUpForm
              isBusy={loading}
              clearError={this.clearError}
              error={error}
              submit={(e: SyntheticEvent<any>) => {
                e.preventDefault();

                this.signUp(signUpMutation)
              }}
              handleInputChange={this.handleInputChange}
              email={email}
              name={name}
              password={password}
              confirmPassword={confirmPassword}
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

export const SignUpPage = connect(mapStateToProps)(SignUpPageComp);

function validateInputs({
  email,
  name,
  password,
  confirmPassword,
}: FormInputs): ?string {
  if (!isEmail(email)) {
    return 'Email is not a valid email';
  }

  if (name.length === 0) {
    return 'Please fill the name';
  }

  if (password.length < 6) {
    return 'Password is too short';
  }

  if (password !== confirmPassword) {
    return 'Password and confirm password fields do not match';
  }

  return null;
}
