// @flow
import * as React from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { Link } from './Link';
import { ROUTE } from '../configs/route';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100vh;
  position: absolute;
  background: white;
  left: ${props => (props.visible ? '0' : '-200')}px;
`;

export function Sidebar() {
  const [visible, setVisible] = React.useState(true);

  return (
    <Container visible={visible}>
      <div>{visible && <MdClose onClick={() => setVisible(false)} />}</div>

      <div>
        <Link to={ROUTE.EXPENSES}>Expenses</Link>
      </div>
      <div>Incomes</div>
    </Container>
  );
}
