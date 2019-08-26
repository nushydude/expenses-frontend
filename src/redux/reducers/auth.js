// @flow
import type { AuthState } from '../types';
import type { AuthActions } from '../actions/auth';
import { AUTH_ACTIONS } from '../actions/auth';

const INITIAL_STATE = {
  jwt: null,
};

type Action = {
  type: AuthActions,
  payload: any,
};

export function auth(
  state: AuthState = INITIAL_STATE,
  { type, payload }: Action,
): AuthState {
  switch (type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return { ...state, jwt: payload };
    default:
      return state;
  }
}
