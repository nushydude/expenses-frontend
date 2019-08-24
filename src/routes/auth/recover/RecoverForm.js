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
};

export function RecoverForm(props: Props) {
  return (
    <form onSubmit={props.submit} style={{ display: 'flex', flexDirection: 'column'}}>
      <input
        onChange={props.handleInputChange('email')}
        onFocus={props.clearError}
        placeholder='Email'
        type='text'
        value={props.email}
      />
      <button type='submit' disabled={props.isBusy}>Send Password Reset Email</button>
      {props.error && <p>Error: {props.error}</p>}
      <p>Don't want to recover password? <Link to={ROUTE.AUTH_LOGIN}>Log In</Link></p>
    </form>
  )
}
