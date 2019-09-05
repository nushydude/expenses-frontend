// @flow
import * as React from 'react';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flexdirection: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;

const Content = styled.div`
  flex: 80;
  padding-right: 20px;
`;

const ControlBox = styled.div`
  flex: 20;
  display: flex;
  justify-content: flex-end;
`;

const ValueBox = styled.p`
  font: 15px roboto, sans-serif;
  margin: 0;
  padding: 4px;
`;

const Input = styled.input`
  font: 15px roboto, sans-serif;
  padding; 4px;
  padding-left: 2px;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  margin-left: 4px;
  padding: 4px;
  width: 60px;
  font: 15px roboto, sans-serif;
`;

type Props = {
  value: string,
  mutation: any,
  field: string,
  getValue: (data: TData) => string,
  getError: (data: TData) => Error,
  getVariables: (value: string) => any,
  formatValue?: (value: string) => String,
};

export function EditableTextField<TData, TVariables>(props: Props) {
  const [editing, setEditing] = React.useState<boolean>(false);
  const [originalValue, setOriginalValue] = React.useState<string>(props.value);
  const [value, setValue] = React.useState<string>(props.value);
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
    },
    onError: (error: Error) => {
      setError(error);
    },
  });

  return (
    <div>
      <Container>
        {editing && (
          <>
            <Content>
              <Input
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                onFocus={() => setError(null)}
              />
            </Content>
            <ControlBox>
              <Button
                onClick={e => save({ variables: props.getVariables(value) })}
                disabled={loading}
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  setEditing(false);
                  // reset the value
                  setValue(props.value);
                  setError(null);
                }}
                disabled={loading}
              >
                Cancel
              </Button>
            </ControlBox>
          </>
        )}
        {!editing && (
          <>
            <Content>
              <ValueBox>{props.formatValue(originalValue)}</ValueBox>
            </Content>
            <ControlBox>
              <Button
                onClick={() => {
                  setEditing(true);
                  setValue(originalValue);
                }}
              >
                Modify
              </Button>
            </ControlBox>
          </>
        )}
      </Container>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

EditableTextField.defaultProps = {
  formatValue: (value: string) => value,
};
