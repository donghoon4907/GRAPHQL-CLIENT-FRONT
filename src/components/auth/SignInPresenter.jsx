import React from "react";
import { Helmet } from "react-helmet";
import {
  Container,
  Wrapper,
  Form,
  StateChanger,
  Link
} from "./StyledComponents";
import Input from "../common/Input";
import Button from "../common/Button";
import Loader from "../common/Loader";

export default ({
  requestSecretLoading,
  confirmSecretLoading,
  action,
  setAction,
  email,
  onSubmit,
  secret
}) => {
  return (
    <Container>
      {(requestSecretLoading || confirmSecretLoading) && <Loader />}
      <Wrapper>
        <Form>
          {action === "login" && (
            <div>
              <Helmet>
                <title>로그인</title>
              </Helmet>
              <form onSubmit={onSubmit}>
                <Input type={"email"} placeholder={"이메일"} {...email} />
                <Button text={"로그인"} />
              </form>
            </div>
          )}
          {action === "confirm" && (
            <>
              <Helmet>
                <title>인증</title>
              </Helmet>
              <form onSubmit={onSubmit}>
                <Input placeholder={"보안 문자"} {...secret} />
                <Button text={"확인"} />
              </form>
            </>
          )}
        </Form>
        {action === "login" && (
          <StateChanger>
            <div>
              계정이 없다면&nbsp;
              <Link onClick={() => setAction("signup")}>회원가입</Link>
            </div>
          </StateChanger>
        )}
      </Wrapper>
    </Container>
  );
};
