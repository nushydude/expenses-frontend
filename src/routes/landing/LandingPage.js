// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { isAuthed } from '../../redux/selectors/auth';
import type { AppState } from '../../redux/types';
import { ROUTE } from '../../configs/route';

type Props = {
  authed: boolean,
};

export function LandingPageComp({ authed }: Props) {
  if (authed) {
    return <Redirect to={ROUTE.HOME} />;
  }

  return (
    <div>
      <h2>Welcome to the Expenses App</h2>

      <p>
        If you have an account, please <Link to={ROUTE.AUTH_LOGIN}>login.</Link>
      </p>

      <p>
        If you do not have an account, please{' '}
        <Link to={ROUTE.AUTH_SIGNUP}>sign up.</Link>
      </p>
    </div>
  );
}

function mapStateToProps(state: AppState) {
  return {
    authed: isAuthed(state),
  };
}

export const LandingPage = connect(mapStateToProps)(LandingPageComp);
