// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ROUTE } from '../../configs/route';
import { isAuthed } from '../../redux/selectors/auth';

export function HomePageComp(props) {
  console.log('HomePageComp props.authed:', props.authed);

  return (
    <>
      {!props.authed && <Redirect to={ROUTE.AUTH_LOGIN} />}

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
