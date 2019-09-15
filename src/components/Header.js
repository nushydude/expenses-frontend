// @flow
import React from 'react';
import { connect } from 'react-redux';
import { MdMenu } from 'react-icons/md';
import styled from 'styled-components';
import { Link } from './Link';
import { LinkButton } from './LinkButton';
// import { Menu } from './Menu';
import { Sidebar } from './Sidebar';
import { ROUTE } from '../configs/route';
import * as actions from '../redux/actionCreators/auth';
import { isAuthed } from '../redux/selectors/auth';
import type { AppState } from '../redux/types';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: #ccc;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 10px;
`;

const LinksBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.div`
  flex-grow: 1;
  margin-left: 16px;
`;

const LinkContainer = styled.div`
  margin-right: 16px;

  :last-child {
    margin-right: 0;
  }
`;

const H1 = styled.h1`
  margin: 0;
`;

type Props = {
  authed: boolean,
  logOut: () => void,
};

export function HeaderComp({ authed, logOut }: Props) {
  const [sideBarOpen, setSideBarOpen] = React.useState(false);

  return (
    <>
      <Sidebar open={sideBarOpen} close={() => setSideBarOpen(false)} />

      <Container>
        <MdMenu size={32} onClick={() => setSideBarOpen(true)} />

        <Title>
          <Link to={ROUTE.LANDING}>
            <H1>HL</H1>
          </Link>
        </Title>

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
    </>
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
