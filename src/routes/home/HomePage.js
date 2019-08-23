// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ROUTE } from '../../configs/route';

export function HomePageComp(props) {
  return (
    <>
      {!props.authed && <Redirect to={ROUTE.LOGIN} />}

      <p>HomePage</p>
    </>
  );
}

function mapStateToProps(state) {
  return {
    authed: Boolean(state.auth.jwt),
  };
}

export const HomePage = connect(mapStateToProps)(HomePageComp);
