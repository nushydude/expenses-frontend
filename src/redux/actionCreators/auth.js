// @flow
import {
  LOGIN_SUCCESS,
} from '../actions/auth';

export function logInSuccess(payload) {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
}
