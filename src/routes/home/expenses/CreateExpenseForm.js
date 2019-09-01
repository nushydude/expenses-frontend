// @flow
import * as React from 'react';

export type FormFields = 'type' | 'amount' | 'date' | 'paymentMethod';

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
  cancel,
}: Props) {
  return (
    <form
      onSubmit={submit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <input
        onChange={handleInputChange('date')}
        onFocus={clearError}
        placeholder="Date"
        type="text"
        value={date}
      />
      <input
        onChange={handleInputChange('type')}
        onFocus={clearError}
        placeholder="Type"
        type="type"
        value={type}
      />
      <input
        onChange={handleInputChange('amount')}
        onFocus={clearError}
        placeholder="Amount"
        type="amount"
        value={amount}
      />
      <input
        onChange={handleInputChange('paymentMethod')}
        onFocus={clearError}
        placeholder="Payment Method"
        type="paymentMethod"
        value={paymentMethod}
      />
      <button type="submit" disabled={isBusy}>
        Create
      </button>
      <button type="button" disabled={isBusy} onClick={cancel}>
        Cancel
      </button>
      {error && <p>Error:{error}</p>}
    </form>
  );
}
