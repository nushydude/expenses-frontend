// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from './Link';
// import { Menu } from './Menu';
import { isAuthed } from '../redux/selectors/auth';
import type { AppState } from '../redux/types';
import { ROUTE } from '../configs/route';
import * as actions from '../redux/actionCreators/auth';
import { LinkButton } from './LinkButton';

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
  logOut: () => void,
};

export function HeaderComp({ authed, logOut }: Props) {
  return (
    <div style={styles.container}>
      <Link to={ROUTE.LANDING}>
        <h1>Header and Logo</h1>
      </Link>
      <div>
        {!authed && (
          <div>
            <Link to={ROUTE.AUTH_LOGIN}>Log In</Link>
            <Link to={ROUTE.AUTH_SIGNUP}>Sign Up</Link>
          </div>
        )}
        {authed && (
          <div>
            <Link to={ROUTE.MANAGE_ACCOUNT}>Manage Account</Link>
            <LinkButton onClick={logOut}>Log Out</LinkButton>
          </div>
        )}

        {/* menu
        {!authed && <Link to={ROUTE.AUTH_LOGIN}>Log In</Link>}
        {!authed && <Link to={ROUTE.AUTH_SIGNUP}>Sign Up</Link>}
        {authed && <Menu />}
        */}
      </div>
    </div>
  );
}

function mapStateToProps(state: AppState) {
  return {
    authed: isAuthed(state),
  };
}

export const Header = connect(
  mapStateToProps,
  actions,
)(HeaderComp);
