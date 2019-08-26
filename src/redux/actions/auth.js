// @flow
export const AUTH_ACTIONS = Object.freeze({
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
});

export type AuthActions = $Values<typeof AUTH_ACTIONS>;
