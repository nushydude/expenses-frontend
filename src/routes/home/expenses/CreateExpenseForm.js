// @flow
import * as React from 'react';
import styled from 'styled-components';

export type FormFields = 'type' | 'amount' | 'date' | 'paymentMethod';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  display: flex:
  flex-direction: column;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font: 16px roboto, sans-serif;
  margin: 0;
`;

const Input = styled.input`
  font: 15px roboto, sans-serif;
  padding; 4px;
  padding-left: 2px;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
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
  clearError: () => void,
  error: ?string,
  isBusy: boolean,
  handleInputChange: (
    name: FormFields,
  ) => (e: SyntheticInputEvent<HTMLInputElement>) => void,
  submit: (e: SyntheticInputEvent<any>) => Promise<void>,
  cancel: () => void,
  type: string,
  amount: number,
  notes: string,
  date: string,
  paymentMethod: string,
};

export function CreateExpenseForm({
  clearError,
  error,
  isBusy,
  handleInputChange,
  submit,
  type,
  amount,
  date,
  paymentMethod,
  notes,
  cancel,
}: Props) {
  return (
    <Container>
      <form
        onSubmit={submit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <FormField>
          <Label>Date</Label>
          <Input
            onChange={handleInputChange('date')}
            onFocus={clearError}
            type="date"
            value={date}
          />
        </FormField>

        <FormField>
          <Label>Type</Label>
          <Input
            onChange={handleInputChange('type')}
            onFocus={clearError}
            type="text"
            value={type}
          />
        </FormField>

        <FormField>
          <Label>Amount</Label>
          <Input
            onChange={handleInputChange('amount')}
            onFocus={clearError}
            type="number"
            step="0.01"
            value={amount}
          />
        </FormField>

        <FormField>
          <Label>Payment Method</Label>
          <Input
            onChange={handleInputChange('paymentMethod')}
            onFocus={clearError}
            type="text"
            value={paymentMethod}
          />
        </FormField>

        <FormField>
          <Label>Notes</Label>
          <TextArea
            onChange={handleInputChange('notes')}
            onFocus={clearError}
            value={notes}
          />
        </FormField>
        <Button type="submit" disabled={isBusy}>
          Create
        </Button>
        <Button type="button" disabled={isBusy} onClick={cancel}>
          Cancel
        </Button>
        {error && <p>Error:{error}</p>}
      </form>
    </Container>
  );
}
