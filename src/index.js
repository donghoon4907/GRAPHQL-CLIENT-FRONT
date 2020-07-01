import "isomorphic-unfetch";
import { AppContainer } from "react-hot-loader";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import App from "./App";
import client from "./apollo/client";

const render = (Component) =>
  ReactDOM.render(
    <AppContainer>
      <StrictMode>
        <ApolloProvider client={client}>
          <Component />
        </ApolloProvider>
      </StrictMode>
    </AppContainer>,
    document.getElementById("root")
  );

render(App);

if (module.hot) module.hot.accept("./App", () => render(App));
