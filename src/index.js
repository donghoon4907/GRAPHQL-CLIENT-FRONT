import "isomorphic-unfetch";
import { AppContainer } from "react-hot-loader";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo-hooks";
import App from "./App";
import client from "./apollo";

const render = (Component) =>
  ReactDOM.render(
    <StrictMode>
      <ApolloProvider client={client}>
        <AppContainer>
          <Component />
        </AppContainer>
      </ApolloProvider>
    </StrictMode>,
    document.getElementById("root")
  );

render(App);

if (module.hot) module.hot.accept("./App", () => render(App));
