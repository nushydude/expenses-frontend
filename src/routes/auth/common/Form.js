// @flow
import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flexdirection: column;
  width: 400px;
  background: #fafafa;
  padding: 20px;
  border: 1px solid #ccc;
`;

type Props = {
  children: React.Node,
  onSubmit: () => void,
};

export function Form({ children, onSubmit }: Props) {
  return (
    <Container>
      <form style={{ width: '100%' }} onSubmit={onSubmit}>
        {children}
      </form>
    </Container>
  );
}
