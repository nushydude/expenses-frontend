// @flow
import * as React from 'react';
import { Link } from '../../../components/Link';
import { ROUTE } from '../../../configs/route';
import { Form } from '../common/Form';
import { Button } from '../../../components/forms/Button';

export type FormFields = 'email';

type Props = {
  clearError: () => void,
  error: ?string,
  isBusy: boolean,
  handleInputChange: (
    name: FormFields,
  ) => (e: SyntheticInputEvent<HTMLInputElement>) => void,
  submit: (e: SyntheticInputEvent<any>) => Promise<void>,
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
    <Form onSubmit={submit}>
      <input
        onChange={handleInputChange('email')}
        onFocus={clearError}
        placeholder="Email"
        type="text"
        value={email}
      />

      <Button type="submit" disabled={isBusy}>
        Send Password Reset Email
      </Button>

      {error && <p>Error:{error}</p>}
      <p>
        Don't want to recover password?
        <Link to={ROUTE.AUTH_LOGIN}>Log In</Link>
      </p>
    </Form>
  );
}
