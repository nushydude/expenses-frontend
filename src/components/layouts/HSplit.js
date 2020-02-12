// @flow
import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1,
  width: 100%;
  background: #eee;
`;

type Props = {
  children: React.Node,
};

export function Spit({ children }: Props) {
  return (
    <Container>
      {children[0]}
      {children[1]}
    </Container>
  );
}
