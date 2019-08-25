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
  password: string,
  confirmPassword: string,
};

export function ChangePasswordForm(props: Props) {
  return (
    <form onSubmit={props.submit} style={{ display: 'flex', flexDirection: 'column'}}>
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
      <button type='submit' disabled={props.isBusy || props.error}>Change Password</button>
      {props.error && <p>Error: {props.error}</p>}
      <p>Don't want to change password? <Link to={ROUTE.AUTH_LOGIN}>Log In</Link></p>
    </form>
  )
}
