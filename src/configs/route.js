// @flow
export const ROUTE = Object.freeze({
  HOME: '/home',
  LANDING: '/',
  AUTH_LOGIN: '/auth/login',
  AUTH_SIGNUP: '/auth/signup',
  AUTH_RECOVER: '/auth/recover',
  AUTH_VERIFY: '/auth/verify',
  AUTH_CHANGE_PWD: '/auth/change_password',
  DASHBOARD: '/home/dashboard',
  EXPENSE: '/home/expenses/:id',
  EXPENSE_CREATE: '/home/expenses/create',
  EXPENSES: '/home/expenses',
  INCOME: '/home/incomes/:id',
  INCOME_CREATE: '/home/incomes/create',
  INCOMES: '/home/incomes',
  MANAGE_ACCOUNT: '/home/account',
});

export type Route = $Values<typeof ROUTE>;
