// @flow
import * as React from 'react';
import styled from 'styled-components';

const ButtonBase = styled.button`
  margin-right: 8px;
  padding: 8px;
  font: 14px roboto, sans-serif;

  ${({ width }) =>
    width &&
    `
    width: ${width};
  `}

  :last-child {
    margin-right: 0;
  }
`;

type Props = {
  children: React.Node,
  onClick: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  disabled?: boolean,
  type?: 'button' | 'submit' | 'reset',
  width?: number | string | null,
};

export function Button({ children, disabled, onClick, type, width }: Props) {
  return (
    <ButtonBase disabled={disabled} onClick={onClick} type={type} width={width}>
      {children}
    </ButtonBase>
  );
}

Button.defaultProps = {
  disabled: false,
  type: 'button',
  width: null,
};
