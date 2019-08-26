// @flow
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import type { Location } from 'react-router-dom';
import queryString from 'query-string';
import { ROUTE } from '../../../configs/route';
import { isAuthed } from '../../../redux/selectors/auth';
import type { AppState } from '../../../redux/types';

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
  location: Location,
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
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      success: false,
    };
  }



  onCompleted = ({ result }: Data) => {
    const { verified, error } = result;

    if (error || !verified) {
      this.setState({ error: error ? error.message : 'Unknown error' });
    } else if (verified) {
      this.setState({ success: true });
    }
  };

  onError = (error: Error) => this.setState({ error: error.message });

  verifyAccount = () => {
    const { secret: verificationSecret } = queryString.parse(
      this.props.location.search,
    );

    if (!verificationSecret) {
      return this.setState({
        error: 'Please use the verify link provided in your email',
      });
    }

    const variables = {
      input: { verificationSecret },
    };

    console.log('calling verifyAccountMutation');

    this.verifyAccountMutation({ variables });
  };

  componentDidMount() {
    this.verifyAccount();
  }

  clearError = () => {
    this.setState({ error: null });
  };

  verifyAccountMutation = () => {
    this.setState({ error: 'Unknown error ' });
  };

  render() {
    const { authed } = this.props;
    const { error, success } = this.state;

    if (authed) {
      return <Redirect to={ROUTE.HOME} />;
    }

    if (error) {
      return <p>Error:{error}</p>;
    }

    if (success) {
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
            return <p>Verifying. Please wait...</p>;
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

export const VerifyAccountPage = connect(mapStateToProps)(
  VerifyAccountPageComp,
);
