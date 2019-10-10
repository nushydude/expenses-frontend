// @flow
import * as React from 'react';
import styled /* , { css, keyframes } */ from 'styled-components';
import { MdClose } from 'react-icons/md';
import { withRouter } from 'react-router-dom';
import { ROUTE } from '../configs/route';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100vh;
  position: absolute;
  background: white;
  padding: 4px;
  box-sizing: border-box;
  box-shadow: 8px 8px 14px 2px rgba(0, 0, 0, 0.41);
  left: ${props => (props.visible ? 0 : '-220px')};
  transition: left 0.2s ease-in-out;
  z-index: 100;
`;

const SidebarButton = styled.div`
  padding: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  border-bottom: 1px solid #eee;

  :hover {
    color: #777;
  }
`;

const H1 = styled.h1`
  margin: 0;
`;

const CloseButtonContainer = styled.div`
  text-align: right;
  padding-right: 4px;
  margin-bottom: 16px;
`;

const CloseButton = styled(MdClose)`
  cursor: pointer;

  :hover {
    color: #777;
  }
`;

type Props = {
  open: boolean,
  close: () => void,
  history: any,
};

function SidebarComp({ open, close, history }: Props) {
  return (
    <Container visible={open}>
      <CloseButtonContainer>
        <H1>
          <CloseButton onClick={close} />
        </H1>
      </CloseButtonContainer>

      <SidebarButton
        onClick={() => {
          history.push(ROUTE.DASHBOARD);
          close();
        }}
      >
        Dashboard
      </SidebarButton>

      <SidebarButton
        onClick={() => {
          history.push(ROUTE.EXPENSES);
          close();
        }}
      >
        Expenses
      </SidebarButton>

      <SidebarButton
        onClick={() => {
          history.push(ROUTE.INCOMES);
          close();
        }}
      >
        Incomes
      </SidebarButton>
    </Container>
  );
}

export const Sidebar = withRouter(SidebarComp);
