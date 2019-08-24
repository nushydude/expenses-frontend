// @flow
export const ROUTE = Object.freeze({
  HOME: '/',
  AUTH_LOGIN: '/auth/login',
  AUTH_SIGNUP: '/auth/signup',
  AUTH_SIGNUP_SUCCESS: '/auth/signup_success',
  AUTH_RECOVER: '/auth/recover',
  AUTH_RECOVER_SUCCESS: '/auth/recover_success',
  AUTH_VERIFY: '/auth/verify',
  AUTH_CHANGE_PWD: '/auth/change_password',
});

export type Route = $Values<typeof ROUTE>;
