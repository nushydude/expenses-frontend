// @flow
export type AuthState = {
  jwt: ?String,
};

export type AppState = {
  auth: AuthState,
};
