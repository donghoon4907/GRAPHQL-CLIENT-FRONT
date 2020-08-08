import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.min.css";
import "github-markdown-css/github-markdown.css";

import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { useQuery } from "react-apollo-hooks";
import reset from "styled-reset";

import theme from "./theme";
import { IS_LOGGED_IN } from "./query/auth";
import Router from "./routes";
import Auth from "./components/auth";

const GlobalStyle = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }

  svg {
    width: 24px;
    height: 24px;
    cursor: pointer;

    &:hover {
      fill: ${props => props.theme.blueColor};
    }
  }
`;

const IsLoggedIn = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Router /> : <Auth />;
};

export default () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <IsLoggedIn />
    </ThemeProvider>
  );
};
