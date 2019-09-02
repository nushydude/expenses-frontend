// @flow
import * as React from 'react';
import { Link } from '../../../components/Link';
import { ROUTE } from '../../../configs/route';

export type FormFields = 'email' | 'password' | 'name' | 'confirmPassword';

type Props = {
  clearError: () => void,
  error: ?string,
  isBusy: boolean,
  handleInputChange: (
    name: FormFields,
  ) => (e: SyntheticInputEvent<HTMLInputElement>) => void,
  submit: (e: SyntheticInputEvent<any>) => Promise<void>,
  email: string,
  name: string,
  password: string,
  confirmPassword: string,
};

export function SignUpForm({
  clearError,
  error,
  isBusy,
  handleInputChange,
  submit,
  email,
  name,
  password,
  confirmPassword,
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
        onChange={handleInputChange('name')}
        onFocus={clearError}
        placeholder="Name"
        type="text"
        value={name}
      />
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
        Sign Up
      </button>
      {error && <p>Error:{error}</p>}
      <p>
        Have an account?
        <Link to={ROUTE.AUTH_LOGIN}>Log In</Link>
      </p>
    </form>
  );
}
