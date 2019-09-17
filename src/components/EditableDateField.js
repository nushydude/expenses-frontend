// @flow
import * as React from 'react';
import { useMutation } from '@apollo/react-hooks';
import styled, { createGlobalStyle } from 'styled-components';
import { MdModeEdit, MdSave, MdCancel } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';

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
  width: 100%
`;

// override the wrapper of the Date Picker to use flex-grow: 1
const GlobalStyle = createGlobalStyle`
  .react-datepicker-wrapper {
    flex-grow: 1;
  }
`;

type Props = {
  value: string,
  mutation: any,
  field: string,
  type?: 'text' | 'date' | 'password' | 'email',
  getValue: (data: TData) => string,
  getError: (data: TData) => Error,
  getVariables: (value: string) => any,
};

export function EditableDateField<TData, TVariables>(props: Props) {
  const [editing, setEditing] = React.useState<boolean>(false);
  const [originalValue, setOriginalValue] = React.useState<string>(
    new Date(props.value),
  );
  const [value, setValue] = React.useState<string>(new Date(props.value));
  const [error, setError] = React.useState<?Error>(null);

  const [save, { loading }] = useMutation<TData, TVariables>(props.mutation, {
    onCompleted: (data: TData) => {
      const error = props.getError(data);

      if (error) {
        return setError(error);
      }

      const value = props.getValue(data);

      setOriginalValue(value);
      setValue(value);
      setEditing(false);
    },
    onError: (error: Error) => {
      setError(error);
    },
  });

  return (
    <>
      <GlobalStyle />
      <Container>
        {editing && (
          <>
            <DatePicker
              selected={value}
              onChange={date => setValue(date)}
              onFocus={() => setError(null)}
              dateFormat="yyyy-MM-dd"
              customInput={<Input />}
            />
            <ControlBox>
              <MdSave
                size={24}
                onClick={e => save({ variables: props.getVariables(value) })}
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
            <ValueBox>{format(value, 'yyyy-MM-dd')}</ValueBox>
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

EditableDateField.defaultProps = {
  type: 'text',
};
