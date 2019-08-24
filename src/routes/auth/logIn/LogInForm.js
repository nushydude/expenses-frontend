// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import {  ROUTE } from '../../../configs/route';
import type { FormFields } from './LogInPage';

type Props = {
  clearError: () => void,
  error: ?string,
  isBusy: boolean,
  handleInputChange: (name: FormFields) => (e: SyntheticEvent<HTMLInputElement>) => void,
  submit: (e: SythenticEvent<any>) => Promise<void>,
  email: string,
  password: string,
};

export function LogInForm(props: Props) {
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
        onChange={props.handleInputChange('password')}
        onFocus={props.clearError}
        placeholder='Password'
        type='password'
        value={props.password}
      />
      <button type='submit' disabled={props.isBusy}>Log In</button>
      {props.error && <p>Error: {props.error}</p>}
      <p>Don't have an account? <Link to={ROUTE.AUTH_SIGNUP}>Sign Up</Link></p>
    </form>
  )
}
