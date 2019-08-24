// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ROUTE } from '../../configs/route';
import { isAuthed } from '../../redux/selectors/auth';

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
    authed: isAuthed(state),
  };
}

export const HomePage = connect(mapStateToProps)(HomePageComp);
