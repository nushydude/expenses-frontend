// @flow
import * as React from 'react';
import { Link } from '../../../components/Link';
import { ROUTE } from '../../../configs/route';
import { TextInput } from '../../../components/forms/TextInput';
import { Button } from '../../../components/forms/Button';
import { Form } from '../common/Form';

export type FormFields = 'email' | 'password';

type Props = {
  clearError: () => void,
  error: ?string,
  isBusy: boolean,
  onChange: (
    name: FormFields,
  ) => (e: SyntheticInputEvent<HTMLInputElement>) => void,
  submit: (e: SyntheticInputEvent<any>) => Promise<void>,
  email: string,
  password: string,
};

export function LogInForm({
  clearError,
  error,
  isBusy,
  onChange,
  submit,
  email,
  password,
}: Props) {
  return (
    <Form onSubmit={submit}>
      <TextInput
        id="email"
        label="Email"
        onChange={onChange('email')}
        onFocus={clearError}
        placeholder="john@company.com"
        value={email}
        type="email"
      />

      <TextInput
        id="password"
        label="Password"
        onChange={onChange('password')}
        onFocus={clearError}
        value={password}
        type="password"
      />

      <Button type="submit" disabled={isBusy} width="100%">
        Log In
      </Button>

      {error && <p>Error:{error}</p>}

      <p>
        Don't have an account? <Link to={ROUTE.AUTH_SIGNUP}>Sign Up</Link>
      </p>
      <p>
        <Link to={ROUTE.AUTH_RECOVER}>Forgot Password</Link>
      </p>
    </Form>
  );
}
