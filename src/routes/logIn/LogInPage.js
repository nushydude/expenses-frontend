// @flow
import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { LogInForm } from './LogInForm';
import * as actions from '../../redux/actionCreators/auth';
import { ROUTE } from '../../configs/route';
import { Redirect } from 'react-router-dom';

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

export function LogInPageComp(props) {
  if (props.authed) {
    return <Redirect to={ROUTE.HOME} />;
  }

  return (
    <Mutation
      mutation={LOGIN_WITH_EMAIL_MUTATION}
      onCompleted={(data) => {
        props.logInSuccess(data.result.jwt);
      }}
    >
      {(logIn, { error, loading }) => (
        <LogInForm logIn={logIn} error={error} loading={loading} />
      )}
    </Mutation>
  );
}

function mapStateToProps(state) {
  return {
    authed: Boolean(state.auth.jwt),
  };
}

export const LogInPage = connect(mapStateToProps, actions)(LogInPageComp);
