// @flow
export const AUTH_ACTIONS = Object.freeze({
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
});

export type AuthActions = $Values<typeof AUTH_ACTIONS>;
