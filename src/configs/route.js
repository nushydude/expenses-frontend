// @flow
export const ROUTE = Object.freeze({
  HOME: '/',
  AUTH_LOGIN: '/auth/login',
  AUTH_SIGNUP: '/auth/signup',
  AUTH_RECOVER: '/auth/recover',
  AUTH_VERIFY: '/auth/verify',
  AUTH_CHANGE_PWD: '/auth/change_password',
});

export type Route = $Values<ROUTE>;
