// @flow
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import type { Location } from 'react-router-dom';
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
  location: Location,
};

type State = {
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

export class VerifyAccountPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      error: null,
      success: false,
    };
  }

  componentDidMount() {
    this.verifyAccount();
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

  clearError = () => {
    this.setState({ error: null });
  };

  // this is a dummy placeholder.
  verifyAccountMutation = async (options: any) => {
    this.setState({ error: 'Unknown error ' });
  };

  verifyAccount = () => {
    const { location } = this.props;

    const { secret: verificationSecret } = queryString.parse(location.search);

    if (!verificationSecret) {
      return this.setState({
        error: 'Please use the verify link provided in your email',
      });
    }

    const variables = {
      input: { verificationSecret },
    };

    return this.verifyAccountMutation({ variables });
  };

  render() {
    const { error, success } = this.state;

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
