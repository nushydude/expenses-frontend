// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../configs/route';

export type FormFields = 'password' | 'confirmPassword';

type Props = {
  clearError: () => void,
  error: ?string,
  isBusy: boolean,
  handleInputChange: (
    name: FormFields,
  ) => (e: SyntheticEvent<HTMLInputElement>) => void,
  submit: (e: SythenticEvent<any>) => Promise<void>,
  password: string,
  confirmPassword: string,
};

export function ChangePasswordForm({
  clearError,
  error,
  isBusy,
  handleInputChange,
  submit,
  password,
  confirmPassword,
}: Props) {
  return (
    <form
      onSubmit={submit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <input
        onChange={handleInputChange('password')}
        onFocus={clearError}
        placeholder="Password"
        type="password"
        value={password}
      />
      <input
        onChange={handleInputChange('confirmPassword')}
        onFocus={clearError}
        placeholder="Confirm Password"
        type="password"
        value={confirmPassword}
      />
      <button type="submit" disabled={isBusy || error}>
        Change Password
      </button>
      {error && <p>Error:{error}</p>}
      <p>
        Don't want to change password?
        <Link to={ROUTE.AUTH_LOGIN}>Log In</Link>
      </p>
    </form>
  );
}
