// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Link } from '../../../components/Link';
import { ROUTE } from '../../../configs/route';

export type FormFields = 'type' | 'amount' | 'date' | 'paymentMethod';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  display: flex:
  flex-direction: column;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font: 16px roboto, sans-serif;
  margin: 0;
  display: block;
  margin-bottom: 4px;
  user-select: none;
`;

const Input = styled.input`
  font: 15px roboto, sans-serif;
  padding: 8px;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  font: 15px roboto, sans-serif;
  padding: 8px;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  margin-right: 8px;
  padding: 4px;
  width: 60px;
  font: 15px roboto, sans-serif;

  :last-child {
    margin-right: 0;
  }
`;

const Buttons = styled.div`
  display: flex;
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
  types?: Array<string>,
  amount: number,
  notes: string,
  date: string,
  paymentMethod: string,
  paymentMethods?: Array<string>,
};

export function CreateExpenseForm({
  clearError,
  error,
  isBusy,
  handleInputChange,
  submit,
  type,
  types,
  amount,
  date,
  paymentMethod,
  paymentMethods,
  notes,
  cancel,
}: Props) {
  return (
    <Container>
      <h3>
        <Link to={ROUTE.EXPENSES}>Expenses</Link> > Adding new expense
      </h3>
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
            list="types"
          />
          <datalist id="types">
            {types.map(t => (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <option value={t} />
            ))}
          </datalist>
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
            list="paymentMethods"
          />
          <datalist id="paymentMethods">
            {paymentMethods.map(t => (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <option value={t} />
            ))}
          </datalist>
        </FormField>

        <FormField>
          <Label>Notes</Label>
          <TextArea
            onChange={handleInputChange('notes')}
            onFocus={clearError}
            value={notes}
            rows="4"
          />
        </FormField>
        <Buttons>
          <Button type="submit" disabled={isBusy}>
            Create
          </Button>
          <Button type="button" disabled={isBusy} onClick={cancel}>
            Cancel
          </Button>
        </Buttons>

        {error && <p>Error:{error}</p>}
      </form>
    </Container>
  );
}

CreateExpenseForm.defaultProps = {
  paymentMethods: [],
  types: [],
};
