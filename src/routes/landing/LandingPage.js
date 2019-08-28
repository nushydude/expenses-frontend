// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { isAuthed } from '../../redux/selectors/auth';
import { HomePage } from '../home/HomePage';
import type { AppState } from '../../redux/types';

type Props = {
  authed: boolean,
};

export function LandingPageComp({ authed }: Props) {
  if (authed) {
    return <HomePage />;
  }

  return <p>LandingPage</p>;
}

function mapStateToProps(state: AppState) {
  return {
    authed: isAuthed(state),
  };
}

export const LandingPage = connect(mapStateToProps)(LandingPageComp);
