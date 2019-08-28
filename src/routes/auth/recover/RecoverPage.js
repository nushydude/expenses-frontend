// @flow
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RecoverForm } from './RecoverForm';
import { ROUTE } from '../../../configs/route';
import { isAuthed } from '../../../redux/selectors/auth';
import type { AppState } from '../../../redux/types';
import type { FormFields } from './RecoverForm';

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
  success: Boolean,
};

type Data = {
  result: {
    jwt: ?string,
    error: ?{
      message: string,
    },
  },
};

export class RecoverPageComp extends React.Component<Props, State> {
  constructor(props) {
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

  handleInputChange = (name: FormFields) => (
    e: SyntheticEvent<HTMLInputElement>,
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
    const { authed } = this.props;
    const { email, error, success } = this.state;

    if (authed) {
      return <Redirect to={ROUTE.HOME} />;
    }

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
          <div style={{ width: '400px' }}>
            <RecoverForm
              isBusy={loading}
              clearError={this.clearError}
              error={error}
              submit={(e: SyntheticEvent<any>) => {
                e.preventDefault();

                const variables = { input: { email } };

                logIn({ variables });
              }}
              handleInputChange={this.handleInputChange}
              email={email}
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
