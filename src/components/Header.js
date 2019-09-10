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
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: #ccc;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 10px;
`;

const LinksBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const LinkContainer = styled.div`
  margin-right: 16px;

  :last-child {
    margin-right: 0;
  }
`;

type Props = {
  authed: boolean,
  logOut: () => void,
};

export function HeaderComp({ authed, logOut }: Props) {
  return (
    <Container>
      <Link to={ROUTE.LANDING}>
        <h1>HL</h1>
      </Link>

      {!authed && (
        <LinksBox>
          <LinkContainer>
            <Link to={ROUTE.AUTH_LOGIN}>Sign In</Link>
          </LinkContainer>
          <LinkContainer>
            <Link to={ROUTE.AUTH_SIGNUP}>Sign Up</Link>
          </LinkContainer>
        </LinksBox>
      )}
      {authed && (
        <LinksBox>
          <LinkContainer>
            <Link to={ROUTE.MANAGE_ACCOUNT}>Account</Link>
          </LinkContainer>
          <LinkContainer>
            <LinkButton onClick={logOut}>Sign Out</LinkButton>
          </LinkContainer>
        </LinksBox>
      )}

      {/* menu
        {!authed && <Link to={ROUTE.AUTH_LOGIN}>Log In</Link>}
        {!authed && <Link to={ROUTE.AUTH_SIGNUP}>Sign Up</Link>}
        {authed && <Menu />}
        */}
    </Container>
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
