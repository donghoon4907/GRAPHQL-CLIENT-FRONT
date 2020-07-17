import ApolloClient from "apollo-boost-upload";
import { defaults, resolvers } from "./localState";
import { showToast } from "../module/toast";

export default new ApolloClient({
  uri: process.env.BACKEND_HOST,
  onError: ({ graphQLErrors, networkError }) => {
    // localStorage.removeItem("token");
    if (graphQLErrors) {
      graphQLErrors.forEach((v) => {
        console.log(showToast);
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
    }
  },
  clientState: {
    defaults,
    resolvers
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});
