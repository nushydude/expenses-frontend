// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../configs/route';
import type { FormFields } from './LogInPage';

type Props = {
  clearError: () => void,
  error: ?string,
  isBusy: boolean,
  handleInputChange: (
    name: FormFields,
  ) => (e: SyntheticEvent<HTMLInputElement>) => void,
  submit: (e: SythenticEvent<any>) => Promise<void>,
  email: string,
};

export function RecoverForm({
  clearError,
  error,
  isBusy,
  handleInputChange,
  submit,
  email,
}: Props) {
  return (
    <form
      onSubmit={submit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <input
        onChange={handleInputChange('email')}
        onFocus={clearError}
        placeholder="Email"
        type="text"
        value={email}
      />
      <button type="submit" disabled={isBusy}>
        Send Password Reset Email
      </button>
      {error && <p>
Error:{error}</p>}
      <p>
        Don't want to recover password?
        <Link to={ROUTE.AUTH_LOGIN}>Log In</Link>
      </p>
    </form>
  );
}
