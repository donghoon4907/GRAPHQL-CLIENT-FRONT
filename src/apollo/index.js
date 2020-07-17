import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { withClientState } from "apollo-link-state";
import { showToast } from "../module/toast";

const token = localStorage.getItem("token");

const defaults = {
  isLoggedIn: token ? true : false
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
  uri: `http://${process.env.BACKEND_HOST}`,
  headers: {
    Authorization: token ? `Bearer ${token}` : ""
  }
});

const wsLink = new WebSocketLink({
  uri: `ws://${process.env.BACKEND_HOST}`,
  options: {
    reconnect: true
  }
});

const link = ApolloLink.from([
  stateLink,
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((v) => {
        showToast({
          type: "error",
          message: v.message
        });
      });
    } else if (networkError) {
      showToast({
        type: "warn",
        message: "서버 점검 중입니다."
      });
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
