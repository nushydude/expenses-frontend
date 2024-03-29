// @flow
import { onError } from 'apollo-link-error';

export const errorHandlerLink = onError(
  ({ graphQLErrors, networkError /* , operation, forward */ }) => {
    // TODO
    // Log out on auth error

    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        console.log(
          `[errorHandlerLink:GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        );
      });
    }

    if (networkError) {
      console.log(`[errorHandlerLink:Network error]: ${networkError}`);
    }
  },
);
