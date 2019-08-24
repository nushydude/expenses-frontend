// @flow
import {
  LOGIN_SUCCESS,
} from '../actions/auth';

export function logInSuccess(payload: string) {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
}
