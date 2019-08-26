// @flow
import type { AppState, AuthState } from '../types';

function getAuthState(state: AppState): AuthState {
  return state.auth;
}

export function isAuthed(state: AppState): boolean {
  return Boolean(getAuthState(state).jwt);
}
