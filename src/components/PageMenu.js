// @flow
import * as React from 'react';
import styled from 'styled-components';
import { MdMoreVert, MdClose } from 'react-icons/md';

type Props = {
  children: React.Node,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  right: 10px;
`;

const Contents = styled.div`
  background: white;
  padding: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 8px 8px 14px 2px rgba(0, 0, 0, 0.41);
  font-size: 12px;
  z-index: 1000;
`;

export function PageMenu({ children }: Props) {
  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <Container onClick={() => setMenuVisible(!menuVisible)}>
      {menuVisible && <MdClose />}
      {!menuVisible && <MdMoreVert />}
      {menuVisible && (
        <Contents onClick={() => setMenuVisible(false)}>{children}</Contents>
      )}
    </Container>
  );
}
