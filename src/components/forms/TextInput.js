// @flow
import * as React from 'react';
import styled from 'styled-components';

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

const Label = styled.label`
  margin-bottom: 8px;
`;

type Props = {
  id: string,
  label: string,
  handleInputChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus: () => void,
  placeholder?: string,
  value: string,
  type?: InputType,
};

export function TextInput({
  id,
  label,
  handleInputChange,
  onFocus,
  placeholder,
  value,
  type,
}: Props) {
  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>

      <input
        id={id}
        onChange={handleInputChange}
        onFocus={onFocus}
        placeholder={placeholder || getPlaceholder(type)}
        type={type}
        value={value}
        style={{
          padding: '8px',
        }}
      />
    </Container>
  );
}

TextInput.defaultProps = {
  placeholder: '',
  type: 'text',
};
