// @flow
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { LogInForm } from './LogInForm';

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

export function LogInPage() {
  return (
    <Mutation
      mutation={LOGIN_WITH_EMAIL_MUTATION}
      onComplete={(data) => {console.log('success'); console.log(data); }}
      onError={(error) => console.log(error)}
    >
      {(logIn, { error, loading }) => (
        <LogInForm logIn={logIn} error={error} loading={loading} />
      )}
    </Mutation>
  );
}
