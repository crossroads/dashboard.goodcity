import Vue from 'vue'
import config from '../config'
import Store from '../store'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, concat, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import VueApollo from 'vue-apollo'

function injectCredentials(url) {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  if (!username || !password) {
    return url;
  }
  return url.replace('://', `://${username}:${password}@`);
}

const httpLink = new HttpLink({
  uri: config.endpoints.http
});

// Create the subscription websocket link
const wsLink = new WebSocketLink({
  uri: injectCredentials(config.endpoints.ws),
  options: {
    reconnect: true,
  },
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const basicAuth = Store.getters.authToken;
  if (basicAuth) {
    operation.setContext({
      headers: {
        authorization: `Basic ${basicAuth}`,
      }
    });
  }
  return forward(operation);
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, link),
  cache: new InMemoryCache(),
  connectToDevTools: config.env.name !== "production"
});

// Install the vue plugin like before
Vue.use(VueApollo);

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});


