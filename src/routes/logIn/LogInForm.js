// @flow
import * as React from 'react';

type Props = {
  clearError: () => void,
  error: ?string,
  isBusy: boolean,
  handleInputChange: (name: string) => (e: SyntheticEvent<HTMLInputElement>) => void,
  submit: (e: SythenticEvent<any>) => Promise<void>,
  email: string,
  password: string,
};

export function LogInForm(props: Props) {
  return (
    <form onSubmit={props.submit}>
      <input
        onChange={props.handleInputChange('email')}
        onFocus={props.clearError}
        placeholder='Email'
        type='text'
        value={props.name}
      />
      <input
        onChange={props.handleInputChange('password')}
        onFocus={props.clearError}
        placeholder='Password'
        type='password'
        value={props.password}
      />
      <button type='submit' disabled={props.isBusy}>Log In</button>
      {props.error && <p>Error: {props.error}</p>}
    </form>
  )
}
