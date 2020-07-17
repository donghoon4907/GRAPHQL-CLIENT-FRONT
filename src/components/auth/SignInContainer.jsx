import React, { useCallback } from "react";
import { useMutation } from "react-apollo-hooks";
import { useInput } from "../../hooks";
import SignInPresenter from "./SignInPresenter";
import { showToast } from "../../module/toast";
import { LOG_IN, CONFIRM_SECRET, CLIENT_LOGIN } from "../../query/auth";

export default ({ action, setAction }) => {
  const email = useInput("");
  const secret = useInput("");

  const [
    requestSecretMutation,
    { loading: requestSecretLoading }
  ] = useMutation(LOG_IN);
  const [
    confirmSecretMutation,
    { loading: confirmSecretLoading }
  ] = useMutation(CONFIRM_SECRET);
  const [logIn] = useMutation(CLIENT_LOGIN);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (action === "login") {
        if (requestSecretLoading) return;

        const {
          data: { requestSecret }
        } = await requestSecretMutation({
          variables: { email: email.value }
        });
        if (requestSecret) {
          setAction("confirm");
          showToast({
            type: "info",
            message: `${requestSecret}을 입력하세요.`
          });
        }
      } else if (action === "confirm") {
        if (confirmSecretLoading) return;

        const {
          data: { confirmSecret }
        } = await confirmSecretMutation({
          variables: { email: email.value, secret: secret.value }
        });
        if (confirmSecret) {
          logIn({ variables: { token: confirmSecret } });
        }
      }
    },
    [email.value, secret.value, requestSecretLoading, confirmSecretLoading]
  );

  return (
    <SignInPresenter
      setAction={setAction}
      action={action}
      email={email}
      onSubmit={onSubmit}
      secret={secret}
    />
  );
};
