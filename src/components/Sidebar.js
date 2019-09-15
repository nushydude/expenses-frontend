// @flow
import * as React from 'react';
import styled from 'styled-components';
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
  left: ${props => (props.visible ? '0' : '-220')}px;
  box-sizing: border-box;
  box-shadow: 8px 8px 14px 2px rgba(0, 0, 0, 0.41);
`;

const SidebarButton = styled.div`
  padding: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  border-bottom: 1px solid #aaa;

  :hover {
    color: #777;
    border-bottom: 1px solid #ccc;
  }
`;

const H1 = styled.h1`
  margin: 0;
`;

const CloseButtonContainer = styled.div`
  text-align: right;
  padding-right: 4px;
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
        <H1>{open && <MdClose onClick={close} />}</H1>
      </CloseButtonContainer>

      <SidebarButton
        onClick={() => {
          history.push(ROUTE.EXPENSES);
          close();
        }}
      >
        Expenses
      </SidebarButton>

      <SidebarButton>Incomes</SidebarButton>
    </Container>
  );
}

export const Sidebar = withRouter(SidebarComp);
