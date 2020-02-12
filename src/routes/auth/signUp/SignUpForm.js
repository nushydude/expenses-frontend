// @flow
import * as React from 'react';
import { Link } from '../../../components/Link';
import { ROUTE } from '../../../configs/route';
import { Button } from '../../../components/forms/Button';
import { TextInput } from '../../../components/forms/TextInput';
import { Form } from '../common/Form';

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
    <Form onSubmit={submit}>
      <TextInput
        id="email"
        label="Email"
        handleInputChange={handleInputChange('email')}
        onFocus={clearError}
        placeholder="john@company.com"
        value={email}
        type="email"
      />

      <TextInput
        id="name"
        label="Name"
        handleInputChange={handleInputChange('name')}
        onFocus={clearError}
        placeholder="john@company.com"
        value={name}
        type="text"
      />

      <TextInput
        id="password"
        label="Password"
        handleInputChange={handleInputChange('password')}
        onFocus={clearError}
        value={password}
        type="password"
      />

      <TextInput
        id="confirmPassword"
        label="Confirm Password"
        handleInputChange={handleInputChange('confirmPassword')}
        onFocus={clearError}
        value={confirmPassword}
        type="password"
      />

      <Button type="submit" disabled={isBusy || error} width="100%">
        Sign Up
      </Button>

      {error && <p>Error:{error}</p>}

      <p>
        Have an account? <Link to={ROUTE.AUTH_LOGIN}>Log In</Link>
      </p>
    </Form>
  );
}
