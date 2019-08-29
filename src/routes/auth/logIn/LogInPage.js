// @flow
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { LogInForm } from './LogInForm';
import * as actions from '../../../redux/actionCreators/auth';
import { ROUTE } from '../../../configs/route';
import { isAuthed } from '../../../redux/selectors/auth';
import type { AppState } from '../../../redux/types';
import type { FormFields } from './LogInForm';

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

type Data = {
  result: {
    jwt: ?string,
    error: ?{
      message: string,
    },
  },
};

export class LogInPageComp extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: null,
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
    const { jwt, error } = result;
    const { logInSuccess } = this.props;

    if (jwt && !error) {
      logInSuccess(jwt);
    } else {
      this.setState({ error: error ? error.message : 'Unknown error' });
    }
  };

  onError = (error: Error) => this.setState({ error: error.message });

  render() {
    const { authed } = this.props;

    if (authed) {
      return <Redirect to={ROUTE.HOME} />;
    }

    const { email, error, password } = this.state;

    return (
      <Mutation
        mutation={LOGIN_WITH_EMAIL_MUTATION}
        onCompleted={this.onCompleted}
        onError={this.onError}
      >
        {(logIn, { loading }) => (
          <div style={{ width: '400px' }}>
            <LogInForm
              isBusy={loading}
              clearError={this.clearError}
              error={error}
              submit={(e: SyntheticInputEvent<any>) => {
                e.preventDefault();

                return logIn({
                  variables: {
                    input: { email, password },
                  },
                });
              }}
              handleInputChange={this.handleInputChange}
              email={email}
              password={password}
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

export const LogInPage = connect(
  mapStateToProps,
  actions,
)(LogInPageComp);
