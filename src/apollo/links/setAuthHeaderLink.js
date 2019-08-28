// @flow
import { setContext } from 'apollo-link-context';
import { store } from '../../redux/store';

export const setAuthHeaderLink = setContext((request, previousContext) => {
  const state = store.getState();
  const { jwt } = state.auth;

  if (jwt) {
    return {
      ...previousContext,
      headers: {
        ...previousContext.headers,
        authorization: jwt,
      },
    };
  }

  const updatedPreviousContext = { ...previousContext };

  if (
    updatedPreviousContext.headers
    && updatedPreviousContext.headers.authorization
  ) {
    delete updatedPreviousContext.headers.authorization;
  }

  return previousContext;
});
