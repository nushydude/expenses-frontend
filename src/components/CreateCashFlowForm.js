// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Link } from './Link';
import { ROUTE } from '../configs/route';

export type FormFields = 'category' | 'amount' | 'date' | 'source' | 'notes';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const Label = styled.label`
  font: 12px roboto, sans-serif;
  margin: 0;
  display: block;
  margin-bottom: 4px;
  user-select: none;
  width: 70px;
`;

const Input = styled.input`
  font: 12px roboto, sans-serif;
  padding: 2px 4px;
  margin: 0;
  flex-grow: 1;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  font: 12px roboto, sans-serif;
  padding: 8px;
  margin: 0;
  flex-grow: 1;
  box-sizing: border-box;
`;

const Button = styled.button`
  margin-right: 8px;
  padding: 4px;
  width: 60px;
  font: 12px roboto, sans-serif;

  :last-child {
    margin-right: 0;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const PageTitleContainer = styled.div`
  display: flex;
  margin-top: 4px;
  margin-bottom: 16px;
`;

const PageTitle = styled.div`
  flex-grow: 1;
  font-size: 14px;
  font-weight: bold;
`;

type Props = {
  clearError: () => void,
  error: ?string,
  isBusy: boolean,
  onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  submit: (e: SyntheticInputEvent<any>) => Promise<void>,
  cancel: () => void,
  category: string,
  categories?: Array<string>,
  amount: number,
  notes: string,
  date: string,
  source: string,
  sources?: Array<string>,
  type: 'EXPENSE' | 'INCOME',
};

export function CreateCashFlowForm({
  clearError,
  error,
  isBusy,
  onChange,
  submit,
  category,
  categories,
  amount,
  date,
  source,
  sources,
  notes,
  cancel,
  type,
}: Props) {
  return (
    <Container>
      <PageTitleContainer>
        <PageTitle>
          <Link to={type === 'EXPENSE' ? ROUTE.EXPENSES : ROUTE.INCOMES}>
            {type === 'EXPENSE' ? 'Expenses' : 'Income'}
          </Link>{' '}
          > Adding new {type === 'EXPENSE' ? 'Expense' : 'Income'}
        </PageTitle>
      </PageTitleContainer>
      <form
        onSubmit={submit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <FormField>
          <Label>Date</Label>
          <Input
            name="date"
            onChange={onChange}
            onFocus={clearError}
            type="date"
            value={date}
          />
        </FormField>

        <FormField>
          <Label>Category</Label>
          <Input
            name="category"
            onChange={onChange}
            onFocus={clearError}
            type="text"
            value={category}
            list="categories"
          />
          <datalist id="categories">
            {categories.map(t => (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <option value={t} />
            ))}
          </datalist>
        </FormField>

        <FormField>
          <Label>Amount</Label>
          <Input
            name="amount"
            onChange={onChange}
            onFocus={clearError}
            type="number"
            step="0.01"
            value={amount}
          />
        </FormField>

        <FormField>
          <Label>Source</Label>
          <Input
            name="source"
            onChange={onChange}
            onFocus={clearError}
            type="text"
            value={source}
            list="sources"
          />
          <datalist id="sources">
            {sources.map(t => (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <option value={t} />
            ))}
          </datalist>
        </FormField>

        <FormField>
          <Label>Notes</Label>
          <TextArea
            name="notes"
            onChange={onChange}
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

CreateCashFlowForm.defaultProps = {
  sources: [],
  categories: [],
};
