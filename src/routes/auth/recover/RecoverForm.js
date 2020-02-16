// @flow
import * as React from 'react';
import { Link } from '../../../components/Link';
import { ROUTE } from '../../../configs/route';
import { Form } from '../common/Form';
import { Button } from '../../../components/forms/Button';
import { TextInput } from '../../../components/forms/TextInput';

export type FormFields = 'email';

type Props = {
  clearError: () => void,
  error: ?string,
  isBusy: boolean,
  onChange: (
    name: FormFields,
  ) => (e: SyntheticInputEvent<HTMLInputElement>) => void,
  submit: (e: SyntheticInputEvent<any>) => Promise<void>,
  email: string,
};

export function RecoverForm({
  clearError,
  error,
  isBusy,
  onChange,
  submit,
  email,
}: Props) {
  return (
    <Form onSubmit={submit}>
      <TextInput
        id="email"
        onChange={onChange('email')}
        onFocus={clearError}
        type="email"
        value={email}
      />

      <Button type="submit" disabled={isBusy}>
        Submit
      </Button>

      {error && <p>Error:{error}</p>}

      <p>
        Don't want to recover password?{' '}
        <Link to={ROUTE.AUTH_LOGIN}>Log In</Link>
      </p>
    </Form>
  );
}
