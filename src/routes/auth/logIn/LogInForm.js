// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../configs/route';

export type FormFields = 'email' | 'password';

type Props = {
  clearError: () => void,
  error: ?string,
  isBusy: boolean,
  handleInputChange: (
    name: FormFields,
  ) => (e: SyntheticEvent<HTMLInputElement>) => void,
  submit: (e: SythenticEvent<any>) => Promise<void>,
  email: string,
  password: string,
};

export function LogInForm({
  clearError,
  error,
  isBusy,
  handleInputChange,
  submit,
  email,
  password,
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
      <input
        onChange={handleInputChange('password')}
        onFocus={clearError}
        placeholder="Password"
        type="password"
        value={password}
      />
      <button type="submit" disabled={isBusy}>
        Log In
      </button>
      {error && <p>Error:{error}</p>}
      <p>
        Don't have an account?
        <Link to={ROUTE.AUTH_SIGNUP}>Sign Up</Link>
      </p>
      <p>
        <Link to={ROUTE.AUTH_RECOVER}>Forgot Password</Link>
      </p>
    </form>
  );
}
