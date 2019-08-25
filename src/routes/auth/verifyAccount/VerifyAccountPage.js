// @flow
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { ROUTE } from '../../../configs/route';
import { Redirect } from 'react-router-dom';
import { isAuthed } from '../../../redux/selectors/auth';
import type { AppState } from '../../../redux/types';
import queryString from 'query-string';

const VERIFY_ACCOUNT_MUTATION = gql`
  mutation Web_VerifyAccount($input: VerifyAccountInput!) {
    result: verifyAccount(input: $input) {
      verified
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
  ...FormInputs,
  error: ?string,
  success: boolean,
};

type Data = {
  result: {
    verified: boolean,
    error: ?{
      message: string,
    },
  },
};

export class VerifyAccountPageComp extends React.Component<Props, State> {
  state = {
    error: null,
    success: false,
  };

  clearError = () => {
    this.setState({ error: null });
  }

  onCompleted = ({ result }: Data) => {
    console.log('onCompleted result:', result)

    const { verified, error } = result;

    if (error || !verified) {
      this.setState({ error: error ? error.message : 'Unknown error' });
    } else if (verified) {
      this.setState({ success: true });
    }
  }

  onError = (error: Error) => this.setState({ error: error.message });

  verifyAccount = () => {
    const { secret: verificationSecret } = queryString.parse(this.props.location.search);

    if (!verificationSecret) {
      return this.setState({ error: 'Please use the verify link provided in your email' });
    }

    const variables = {
      input: { verificationSecret },
    };

    console.log('calling verifyAccountMutation')

    this.verifyAccountMutation({ variables });
  }

  componentDidMount() {
    this.verifyAccount()
  }

  verifyAccountMutation = () => {
    this.setState({ error: 'Unknown error '});
  };


  render() {
    if (this.props.authed) {
      return <Redirect to={ROUTE.HOME} />;
    }

    if (this.state.error) {
      return <p>Error: {this.state.error}</p>;
    }

    if (this.state.success) {
      return <p>Account verified successfully</p>;
    }

    return (
      <Mutation
        mutation={VERIFY_ACCOUNT_MUTATION}
        onCompleted={this.onCompleted}
        onError={this.onError}
      >
        {(verifyAccountMutation, { loading }) => {
          this.verifyAccountMutation = verifyAccountMutation;

          if (loading) {
            return <p>Verifying. Please wait...</p>
          }

          return null;
        }}
      </Mutation>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    authed: isAuthed(state),
  };
}

export const VerifyAccountPage = connect(mapStateToProps)(VerifyAccountPageComp);
