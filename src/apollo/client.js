import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./localState";

export default new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_HOST,
  clientState: {
    defaults,
    resolvers
  }
});
