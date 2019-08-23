// @flow
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';
import { errorHandlerLink } from './links/errorHandlerLink';
import { setAuthHeaderLink } from './links/setAuthHeaderLink';

let client;

export function getApolloClient(uri) {
  if (client) {
    return client;
  }

  const cache = new InMemoryCache();

  const link = ApolloLink.from([
    errorHandlerLink,
    setAuthHeaderLink,
    new RetryLink(),
    new HttpLink({ uri }),

  ]);

  client = new ApolloClient({
    cache,
    link,
    name: 'ExpenesesWebClient',
    version: '0.1',
    queryDeduplication: false,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });

  return client;
}
