// @flow
import { setContext } from 'apollo-link-context';
import { getStore } from '../../redux/getStore';

export const setAuthHeaderLink = setContext((request, previousContext) => {
  const store = getStore();
  const state = store.getState();
  const { jwt } = state.auth;

  if (jwt) {
    return ({
      ...previousContext,
      headers: {
        ...previousContext.headers,
        authorization: jwt,
      },
    });
  }

  const updatedPreviousContext = { ...previousContext };

  if (updatedPreviousContext.headers && updatedPreviousContext.headers.authorization) {
    delete updatedPreviousContext.headers.authorization;
  }

  return previousContext;
});
