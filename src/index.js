import "isomorphic-unfetch";
import { AppContainer } from "react-hot-loader";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo-hooks";
import App from "./App";
import client from "./apollo";

const render = Component =>
  ReactDOM.render(
    <ApolloProvider client={client}>
      <AppContainer>
        <Component />
      </AppContainer>
    </ApolloProvider>,
    document.getElementById("root")
  );

render(App);

if (module.hot) module.hot.accept("./App", () => render(App));
