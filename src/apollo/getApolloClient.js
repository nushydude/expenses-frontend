// @flow
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from 'apollo-client';
import { from } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { RetryLink } from 'apollo-link-retry';
import localforage from 'localforage';
import { errorHandlerLink } from './links/errorHandlerLink';
import { setAuthHeaderLink } from './links/setAuthHeaderLink';

let client;

export async function getApolloClient(uri: string): Promise<ApolloClient> {
  if (client) {
    return client;
  }

  const retryLink = new RetryLink();
  const httpLink = createHttpLink({ uri });
  const cache = new InMemoryCache();

  await persistCache<any>({
    cache,
    storage: localforage,
  });

  const link = from([errorHandlerLink, setAuthHeaderLink, retryLink, httpLink]);

  client = new ApolloClient({
    cache,
    link,
    queryDeduplication: false,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });

  return client;
}
