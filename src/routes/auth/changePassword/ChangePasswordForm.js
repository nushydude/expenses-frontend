// @flow
import * as React from 'react';
import { Link } from '../../../components/Link';
import { ROUTE } from '../../../configs/route';
import { Form } from '../common/Form';
import { Button } from '../../../components/forms/Button';

export type FormFields = 'password' | 'confirmPassword';

type Props = {
  clearError: () => void,
  error: ?string,
  isBusy: boolean,
  handleInputChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  submit: (e: SyntheticInputEvent<any>) => Promise<void>,
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
    <Form onSubmit={submit}>
      <input
        name="password"
        onChange={handleInputChange}
        onFocus={clearError}
        placeholder="Password"
        type="password"
        value={password}
      />

      <input
        name="confirmPassword"
        onChange={handleInputChange}
        onFocus={clearError}
        placeholder="Confirm Password"
        type="password"
        value={confirmPassword}
      />

      <Button type="submit" disabled={isBusy || error}>
        Change Password
      </Button>

      {error && <p>Error:{error}</p>}

      <p>
        Don't want to change password?
        <Link to={ROUTE.AUTH_LOGIN}>Log In</Link>
      </p>
    </Form>
  );
}
