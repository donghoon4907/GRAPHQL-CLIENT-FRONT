import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.min.css";
// import "react-toastify/dist/ReactToastify.css";

import React, { Suspense } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { useQuery } from "react-apollo-hooks";
// import { ToastContainer } from "react-toastify";
import reset from "styled-reset";

import theme from "./theme";
import { IS_LOGGED_IN } from "./query/auth";
import Router from "./routes";
import Auth from "./components/auth";
import Loader from "./components/common/Loader";

const GlobalStyle = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }

  svg {
    width: 24px;
    height: 24px;
    cursor: pointer;
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
      <Suspense fallback={<Loader />}>
        <IsLoggedIn />
      </Suspense>
    </ThemeProvider>
  );
};
