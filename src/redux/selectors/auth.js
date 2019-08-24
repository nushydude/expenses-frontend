// @flow
import type { AppState } from '../types';

function getAuthState(state: AppState): ?string {
  return state.auth;
}

export function isAuthed(state: AppState): boolean {
  return Boolean(getAuthState(state).jwt);
}