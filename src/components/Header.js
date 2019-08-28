// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from './Menu';
import { isAuthed } from '../redux/selectors/auth';
import type { AppState } from '../redux/types';
import { ROUTE } from '../configs/route';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    background: 'pink',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1em',
    marginBottom: '10px',
  },
};

type Props = {
  authed: boolean,
};

export function HeaderComp({ authed }: Props) {
  return (
    <div style={styles.container}>
      <Link to={ROUTE.LANDING}>
        <h1>Expenses App</h1>
      </Link>
      <div>
        {!authed && <Link to={ROUTE.AUTH_LOGIN}>Log In</Link>}
        {!authed && <Link to={ROUTE.AUTH_SIGNUP}>Sign Up</Link>}
        {authed && <Menu />}
      </div>
    </div>
  );
}

function mapStateToProps(state: AppState) {
  return {
    authed: isAuthed(state),
  };
}

export const Header = connect(mapStateToProps)(HeaderComp);
