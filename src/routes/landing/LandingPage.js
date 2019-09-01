// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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

  return <p>LandingPage</p>;
}

function mapStateToProps(state: AppState) {
  return {
    authed: isAuthed(state),
  };
}

export const LandingPage = connect(mapStateToProps)(LandingPageComp);
