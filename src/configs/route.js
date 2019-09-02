// @flow
export const ROUTE = Object.freeze({
  HOME: '/home',
  LANDING: '/',
  AUTH_LOGIN: '/auth/login',
  AUTH_SIGNUP: '/auth/signup',
  AUTH_RECOVER: '/auth/recover',
  AUTH_VERIFY: '/auth/verify',
  AUTH_CHANGE_PWD: '/auth/change_password',
  CREATE_EXPENSE: '/home/expenses/create',
  EXPENSES: '/home/expenses',
  EXPENSE: '/home/expenses/:id',
  MANAGE_ACCOUNT: '/home/account',
});

export type Route = $Values<typeof ROUTE>;
