// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ROUTE } from '../../configs/route';
import { isAuthed } from '../../redux/selectors/auth';
import type { AppState } from '../../redux/types';

type Props = {
  authed: Boolean,
};

export function HomePageComp({ authed }: Props) {
  if (!authed) {
    return <Redirect to={ROUTE.AUTH_LOGIN} />;
  }

  return <p>HomePage</p>;
}

function mapStateToProps(state: AppState) {
  return {
    authed: isAuthed(state),
  };
}

export const HomePage = connect(mapStateToProps)(HomePageComp);
