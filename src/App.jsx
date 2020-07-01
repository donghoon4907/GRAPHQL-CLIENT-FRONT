import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.min.css";
import "react-toastify/dist/ReactToastify.css";

import React, { useState, useEffect } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ToastContainer } from "react-toastify";
import reset from "styled-reset";

import theme from "./theme";
import { IS_LOGGED_IN, CHECK_TOKEN } from "./query/auth";
import Router from "./routes";
import Auth from "./components/auth/AuthContainer";
import Loading from "./components/common/Loading";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

const GlobalStyle = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
`;

export default () => {
  const [loading, setLoading] = useState(false);
  const {
    data: { isLoggedIn }
  } = useQuery(IS_LOGGED_IN);

  const [checkToken] = useMutation(CHECK_TOKEN);

  useEffect(() => {
    checkToken();
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {loading ? (
        <>
          {isLoggedIn && <Header />}
          {isLoggedIn && <Router />}
          {isLoggedIn && <Footer />}
          {!isLoggedIn && <Auth />}
        </>
      ) : (
        <Loading />
      )}
      <ToastContainer />
    </ThemeProvider>
  );
};
