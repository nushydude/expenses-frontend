// @flow
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { LogInForm } from './LogInForm';
import * as actions from '../../redux/actionCreators/auth';
import { ROUTE } from '../../configs/route';
import { Redirect } from 'react-router-dom';
import { isAuthed } from '../../redux/selectors/auth';
import type { AppState } from '../../redux/types';

const LOGIN_WITH_EMAIL_MUTATION = gql`
  mutation Web_LogInWithEmail($input: LogInWithEmailInput!) {
    result: logInWithEmail(input: $input) {
      jwt
      error {
        message
      }
    }
  }
`;

type Props = {
  authed: boolean,
  logInSuccess: (jwt: string) => void,
};

type State = {
  email: string,
  password: string,
  error: ?string,
};

export type FormFields = 'email' | 'password';

type Data = {
  result: {
    jwt: ?string,
    error: ?{
      message: string,
    },
  },
};

export class LogInPageComp extends React.Component<Props, State> {
  state = {
    email: '',
    password: '',
    error: null,
  };

  clearError = () => {
    this.setState({ error: null });
  }

  handleInputChange = (name: FormFields) => (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ [name]: e.target.value });
  }

  onCompleted = ({ result }: Data) => {
    const { jwt, error } = result;

    if (jwt && !error) {
      this.props.logInSuccess(result.jwt);
    } else {
      this.setState({ error: error ? error.message : 'Unknown error' });
    }
  }

  onError = (error: Error) => this.setState({ error: error.message });

  render() {
    if (this.props.authed) {
      return <Redirect to={ROUTE.HOME} />;
    }

    return (
      <Mutation
        mutation={LOGIN_WITH_EMAIL_MUTATION}
        onCompleted={this.onCompleted}
        onError={this.onError}
      >
        {(logIn, { loading }) => (
          <LogInForm
            isBusy={loading}
            clearError={this.clearError}
            error={this.state.error}
            submit={(e: SyntheticEvent<any>) => {
              e.preventDefault();

              const { email, password } = this.state;
              const variables = { input: { email, password } };

              logIn({ variables });
            }}
            handleInputChange={this.handleInputChange}
            email={this.state.email}
            password={this.state.password}
          />
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

export const LogInPage = connect(mapStateToProps, actions)(LogInPageComp);
