import React, { useState, useCallback } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useInput } from "../../hooks";
import AuthPresenter from "./AuthPresenter";
import { showToast } from "../../module/toast";
import {
  LOG_IN,
  ADD_USER,
  CONFIRM_SECRET,
  CLIENT_LOGIN
} from "../../query/auth";

export default () => {
  const [action, setAction] = useState("login");
  const nickname = useInput("");
  const firstname = useInput("");
  const lastname = useInput("");
  const email = useInput("");
  const loginEmail = useInput("");
  const secret = useInput("");

  const [requestSecret, { loading: requestSecretLoading }] = useMutation(
    LOG_IN
  );
  const [addUser, { loading: addUserLoading }] = useMutation(ADD_USER);
  const [confirmSecret, { loading: confirmSecretLoading }] = useMutation(
    CONFIRM_SECRET
  );
  const [logIn, { loading: loginLoading }] = useMutation(CLIENT_LOGIN);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      // 로그인 버튼을 누른 경우
      if (action === "login") {
        if (requestSecretLoading) return;

        try {
          const { data } = await requestSecret({
            variables: { email: loginEmail.value }
          });
          if (data.requestSecret) {
            setAction("confirm");
            showToast({
              type: "info",
              message: "이메일로 인증코드를 보냈습니다."
            });
          } else {
            showToast({
              type: "error",
              message: "존재하지 않는 이메일입니다."
            });
          }
        } catch {
          showToast({
            type: "warn",
            message: "서버가 응답하지 않습니다."
          });
        }
        // 회원 가입 버튼을 누른 경우
      } else if (action === "signup") {
        if (addUserLoading) return;

        try {
          const {
            data: {
              addUser: { success, message }
            }
          } = await addUser({
            variables: {
              email: email.value,
              nickname: nickname.value,
              firstname: firstname.value,
              lastname: lastname.value
            }
          });
          if (success) {
            setAction("login");
            showToast({
              type: "success",
              message
            });
          } else {
            showToast({
              type: "error",
              message
            });
          }
        } catch {
          showToast({
            type: "warn",
            message: "서버가 응답하지 않습니다."
          });
        }
        // 보안문자 확인 버튼을 누른 경우
      } else if (action === "confirm") {
        if (confirmSecretLoading) return;

        try {
          const { data } = await confirmSecret({
            variables: { email: loginEmail.value, secret: secret.value }
          });
          if (data.confirmSecret) {
            logIn({ variables: { token: data.confirmSecret } });
          } else {
            showToast({
              type: "error",
              message: "토큰을 받아오지 못했습니다."
            });
          }
        } catch {
          showToast({
            type: "warn",
            message: "서버가 응답하지 않습니다."
          });
        }
        // 잘못된 경로
      } else {
        showToast({
          type: "warn",
          message: "잘못된 접근입니다."
        });
      }
    },
    [
      loginEmail.value,
      email.value,
      nickname.value,
      secret.value,
      requestSecretLoading,
      addUserLoading,
      confirmSecretLoading
    ]
  );

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      nickname={nickname}
      firstname={firstname}
      lastname={lastname}
      email={email}
      loginEmail={loginEmail}
      onSubmit={onSubmit}
      secret={secret}
    />
  );
};
