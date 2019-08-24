// @flow
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { RecoverForm } from './RecoverForm';
import { ROUTE } from '../../../configs/route';
import { Redirect } from 'react-router-dom';
import { isAuthed } from '../../../redux/selectors/auth';
import type { AppState } from '../../redux/types';

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

type Props = {
  authed: boolean,
};

type State = {
  email: string,
  error: ?string,
};

export type FormFields = 'email';

type Data = {
  result: {
    jwt: ?string,
    error: ?{
      message: string,
    },
  },
};

export class RecoverPageComp extends React.Component<Props, State> {
  state = {
    email: '',
    error: null,
  };

  clearError = () => {
    this.setState({ error: null });
  }

  handleInputChange = (name: FormFields) => (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ [name]: e.target.value });
  }

  onCompleted = ({ result }: Data) => {
    const { sent, error } = result;

    if (sent && !error) {
      this.props.history.push(ROUTE.AUTH_RECOVER_SUCCESS);
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
        mutation={SEND_RESET_PASSWORD_LINK_MUTATION}
        onCompleted={this.onCompleted}
        onError={this.onError}
      >
        {(logIn, { loading }) => (
          <div style={{width: '400px'}}>
            <RecoverForm
              isBusy={loading}
              clearError={this.clearError}
              error={this.state.error}
              submit={(e: SyntheticEvent<any>) => {
                e.preventDefault();

                const { email } = this.state;
                const variables = { input: { email } };

                logIn({ variables });
              }}
              handleInputChange={this.handleInputChange}
              email={this.state.email}
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

export const RecoverPage = connect(mapStateToProps)(RecoverPageComp);
