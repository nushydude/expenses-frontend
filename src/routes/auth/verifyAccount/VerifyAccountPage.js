// @flow
import gql from 'graphql-tag';
import * as React from 'react';
import type { Location } from 'react-router-dom';
import queryString from 'query-string';
import { useMutation } from '@apollo/react-hooks';

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

type Variables = {
  input: {
    verificationSecret: string,
  },
};

type Data = {
  result: {
    verified: boolean,
    error: ?{
      message: string,
    },
  },
};

export function VerifyAccountPage(props: Props) {
  const [verifyAccount, { data, error, loading }] = useMutation<
    Data,
    Variables,
  >(VERIFY_ACCOUNT_MUTATION);

  const { location } = props;

  const { secret: verificationSecret } = queryString.parse(location.search);

  if (!verificationSecret) {
    return <p>Please use the exact verify link provided in your email</p>;
  }

  const variables = {
    input: { verificationSecret },
  };

  if (loading) {
    return <p>Verifying. Please wait...</p>;
  }

  if (error) {
    return <p>Error:{error}</p>;
  }

  if (data && data.result.error) {
    return <p>Error:{data.result.error.message}</p>;
  }

  if (data && data.result.verified) {
    return <p>Account verified successfully</p>;
  }

  verifyAccount({ variables });

  return null;
}
