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
`;

const ControlBox = styled.div`
  width: 50px;
  display: flex;
  justify-content: flex-end;
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
  getValue: (data: any) => string,
  getError: (data: any) => ?Error,
  getVariables: (value: string) => any,
};

export function EditableTextField({ props }: Props) {
  const [editing, setEditing] = React.useState<boolean>(false);
  const [originalValue, setOriginalValue] = React.useState<string>(props.value);
  const [value, setValue] = React.useState<string>(props.value);
  const [error, setError] = React.useState<?Error>(null);

  const [save, { loading }] = useMutation(props.mutation, {
    onCompleted: data => {
      const mutationError = props.getError(data);

      if (mutationError) {
        return setError(mutationError);
      }

      const extractedValue = props.getValue(data);

      setOriginalValue(extractedValue);
      setValue(extractedValue);
      setEditing(false);
    },
    onError: setError,
  });

  return (
    <>
      <Container>
        {editing && (
          <>
            <Input
              type="text"
              value={value}
              onChange={e => setValue(e.target.value)}
              onFocus={() => setError(null)}
            />
            <ControlBox>
              <MdSave
                size={24}
                onClick={() => save({ variables: props.getVariables(value) })}
                disabled={loading}
              />
              <MdCancel
                size={24}
                onClick={() => {
                  setEditing(false);
                  // reset the value
                  setValue(originalValue);
                  setError(null);
                }}
                disabled={loading}
              />
            </ControlBox>
          </>
        )}
        {!editing && (
          <>
            <ValueBox>{value}</ValueBox>
            <ControlBox>
              <MdModeEdit size={24} onClick={() => setEditing(true)} />
            </ControlBox>
          </>
        )}
      </Container>
      {error && <p>Error: {error.message}</p>}
    </>
  );
}

EditableTextField.defaultProps = {
  type: 'text',
};
