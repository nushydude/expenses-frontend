// @flow
import * as React from 'react';
import styled from 'styled-components';
import MUButton from '@material-ui/core/Button';

const ButtonBase = styled(MUButton)`
  margin-right: 8px;

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
  variant?: 'contained' | 'outlined' | 'text',
};

export function Button({ children, ...restProps }: Props) {
  return <ButtonBase {...restProps}>{children}</ButtonBase>;
}

Button.defaultProps = {
  disabled: false,
  type: 'button',
  width: null,
  variant: 'outlined',
};
