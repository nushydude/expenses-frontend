// @flow
import {
  LOGIN_SUCCESS,
} from '../actions/auth';

const INITIAL_STATE = {
  jwt: null,
};

export const auth = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return { ...state, jwt: payload.jwt };
    default:
      return state;
  }
};
