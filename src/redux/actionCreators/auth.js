// @flow
import { AUTH_ACTIONS } from '../actions/auth';

export function logInSuccess(payload: string) {
  return {
    type: AUTH_ACTIONS.LOGIN_SUCCESS,
    payload,
  };
}

export function logOut() {
  return {
    type: AUTH_ACTIONS.LOGOUT,
  };
}