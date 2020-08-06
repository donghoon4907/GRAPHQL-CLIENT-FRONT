import React, { useCallback } from "react";
import { useMutation } from "react-apollo-hooks";
import { useInput } from "../../hooks";
import SignInPresenter from "./SignInPresenter";
import { LOG_IN, CLIENT_LOGIN } from "../../query/auth";

export default () => {
  const email = useInput("");
  const pwd = useInput("");

  const [logInMutation, { loading }] = useMutation(LOG_IN);
  const [clientLogIn] = useMutation(CLIENT_LOGIN);

  const onSubmit = useCallback(
    async e => {
      e.preventDefault();
      if (loading) return;

      const {
        data: { logIn }
      } = await logInMutation({
        variables: { email: email.value, pwd: pwd.value }
      });
      if (logIn) {
        clientLogIn({ variables: { token: logIn } });
      }
    },
    [email.value, pwd.value, loading]
  );

  return (
    <SignInPresenter
      loading={loading}
      email={email}
      pwd={pwd}
      onSubmit={onSubmit}
    />
  );
};
