// @flow
import type { AuthState } from '../types';
import {
  LOGIN_SUCCESS,
} from '../actions/auth';

const INITIAL_STATE = {
  jwt: null,
};

export const auth = (state: AuthState = INITIAL_STATE, { type, payload }): AuthState => {
  switch (type) {
    case LOGIN_SUCCESS:
      return { ...state, jwt: payload };
    default:
      return state;
  }
};
