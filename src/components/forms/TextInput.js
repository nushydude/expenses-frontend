// @flow
import * as React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

type InputType = 'email' | 'text' | 'password';

function getPlaceholder(type: InputType) {
  if (type === 'email') {
    return 'johndoe@gmail.com';
  } else if (type === 'password') {
    return '************';
  }

  return '';
}

const Container = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
`;

type Props = {
  id: string,
  label: string,
  onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus: () => void,
  placeholder?: string,
  value: string,
  type?: InputType,
  variant?: 'standard' | 'outlined' | 'filled',
};

export function TextInput({ placeholder, ...restProps }: Props) {
  return (
    <Container>
      <TextField
        {...restProps}
        placeholder={placeholder || getPlaceholder(restProps.type)}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Container>
  );
}

TextInput.defaultProps = {
  placeholder: '',
  type: 'text',
  variant: 'outlined',
};
