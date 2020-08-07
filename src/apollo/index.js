import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { withClientState } from "apollo-link-state";

const token = localStorage.getItem("token");

const defaults = {
  isLoggedIn: token ? true : false,
  isShowNoticeModal: false
};

const resolvers = {
  Mutation: {
    logIn: (_, { token }) => {
      localStorage.setItem("token", token);
      window.location.reload();
      return null;
    },
    logOut: () => {
      localStorage.removeItem("token");
      window.location.reload();
      return null;
    }
  }
};

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  resolvers,
  defaults
});

const httpLink = new HttpLink({
  uri: process.env.BACKEND_PATH,
  headers: {
    Authorization: token ? `Bearer ${token}` : ""
  }
});

const wsLink = new WebSocketLink({
  uri: process.env.WEBSOCKET_PATH,
  options: {
    reconnect: true
  }
});

const link = ApolloLink.from([
  stateLink,
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(v => {
        alert(v.message);
      });
      localStorage.removeItem("token");
      window.location.reload();
    } else if (networkError) {
      alert("서버 점검 중입니다.");
      localStorage.removeItem("token");
      window.location.reload();
    }
  }),
  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  )
]);

const client = new ApolloClient({
  link,
  cache
});

export default client;
