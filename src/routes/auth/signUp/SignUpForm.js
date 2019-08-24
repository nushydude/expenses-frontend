// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import {  ROUTE } from '../../../configs/route';
import type { FormFields } from './SignUpPage';

type Props = {
  clearError: () => void,
  error: ?string,
  isBusy: boolean,
  handleInputChange: (name: FormFields) => (e: SyntheticEvent<HTMLInputElement>) => void,
  submit: (e: SythenticEvent<any>) => Promise<void>,
  email: string,
  name: string,
  password: string,
  confirmPassword: string,
};

export function SignUpForm(props: Props) {
  return (
    <form onSubmit={props.submit} style={{ display: 'flex', flexDirection: 'column'}}>
      <input
        onChange={props.handleInputChange('email')}
        onFocus={props.clearError}
        placeholder='Email'
        type='text'
        value={props.email}
      />
      <input
        onChange={props.handleInputChange('name')}
        onFocus={props.clearError}
        placeholder='Name'
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
      <input
        onChange={props.handleInputChange('confirmPassword')}
        onFocus={props.clearError}
        placeholder='Confirm Password'
        type='password'
        value={props.confirmPassword}
      />
      <button type='submit' disabled={props.isBusy || props.error}>Sign Up</button>
      {props.error && <p>Error: {props.error}</p>}
      <p>Have an account? <Link to={ROUTE.AUTH_LOGIN}>Log In</Link></p>
    </form>
  )
}
