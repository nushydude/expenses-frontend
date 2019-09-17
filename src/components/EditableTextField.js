// @flow
import * as React from 'react';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import { MdModeEdit, MdSave, MdCancel } from 'react-icons/md';

const Container = styled.div`
  display: flex;
  flexdirection: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  flex-grow: 1;
  background: #aaa;
`;

const ControlBox = styled.div`
  width: 50px;
  display: flex;
  justify-content: flex-end;
  background: #999;
`;

const ValueBox = styled.p`
  font: 15px roboto, sans-serif;
  margin: 0;
  padding: 4px;
  display: block;
`;

const Input = styled.input`
  font: 15px roboto, sans-serif;
  padding; 4px;
  padding-left: 2px;
  margin: 0;
  box-sizing: border-box;
  flex-grow: 1;
`;

type Props = {
  value: string,
  mutation: any,
  field: string,
  type?: 'text' | 'date' | 'password' | 'email',
  getValue: (data: TData) => string,
  getError: (data: TData) => Error,
  getVariables: (value: string) => any,
  formatValue?: (value: string) => String,
};

export function EditableTextField<TData, TVariables>(props: Props) {
  const [editing, setEditing] = React.useState<boolean>(false);
  const [originalValue, setOriginalValue] = React.useState<string>(props.value);
  const [inputValue, setInputValue] = React.useState<string>(
    props.formatValueForInput(props.value),
  );
  const [displayValue, setDisplayValue] = React.useState<string>(
    props.formatValueForDisplay(props.value),
  );
  const [error, setError] = React.useState<?Error>(null);

  const [save, { loading }] = useMutation<TData, TVariables>(props.mutation, {
    onCompleted: (data: TData) => {
      const error = props.getError(data);

      if (error) {
        return setError(error);
      }

      const value = props.getValue(data);

      setOriginalValue(value);

      setEditing(false);

      setInputValue(props.formatValueForInput(value));
      setDisplayValue(props.formatValueForDisplay(value));
    },
    onError: (error: Error) => {
      setError(error);
    },
  });

  console.log('inputValue:', inputValue);
  console.log('displayValue:', displayValue);

  return (
    <>
      <Container>
        {editing && (
          <>
            <Input
              type={props.type}
              value={inputValue}
              onChange={e => {
                const { value } = e.target;

                setInputValue(value);
                setDisplayValue(props.formatValueForDisplay(value));
              }}
              onFocus={() => setError(null)}
            />
            <ControlBox>
              <MdSave
                size={24}
                onClick={e =>
                  save({ variables: props.getVariables(inputValue) })
                }
                disabled={loading}
              />
              <MdCancel
                size={24}
                onClick={() => {
                  setEditing(false);
                  // reset the value
                  setInputValue(props.formatValueForInput(originalValue));
                  setDisplayValue(props.formatValueForDisplay(originalValue));
                  setError(null);
                }}
                disabled={loading}
              />
            </ControlBox>
          </>
        )}
        {!editing && (
          <>
            <ValueBox>{displayValue}</ValueBox>
            <ControlBox>
              <MdModeEdit
                size={24}
                onClick={() => {
                  setEditing(true);
                }}
              />
            </ControlBox>
          </>
        )}
      </Container>
      {error && <p>Error: {error.message}</p>}
    </>
  );
}

EditableTextField.defaultProps = {
  formatValueForDisplay: (value: string) => value,
  formatValueForInput: (value: string) => value,
  type: 'text',
};
