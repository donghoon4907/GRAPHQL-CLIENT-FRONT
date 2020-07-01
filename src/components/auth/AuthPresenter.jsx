import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import Input from "../common/Input";
import Button from "../common/Button";

const Container = styled.div`
  position: relative;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius: 0;
  width: 100%;
  max-width: 350px;
`;
const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
  &:link {
    margin-left: 523px;
  }
`;
const Link = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  width: 100%;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(last-child) {
        margin-bottom: 10px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;
export default ({
  action,
  setAction,
  nickname,
  firstname,
  lastname,
  email,
  loginEmail,
  onSubmit,
  secret
}) => {
  return (
    <Container>
      <Wrapper>
        <Form>
          {action === "login" && (
            <div>
              <Helmet>
                <title>로그인</title>
              </Helmet>
              <form onSubmit={onSubmit}>
                <Input type={"email"} placeholder={"이메일"} {...loginEmail} />
                <Button text={"로그인"} />
              </form>
            </div>
          )}
          {action === "signup" && (
            <>
              <Helmet>
                <title>회원가입</title>
              </Helmet>
              <form onSubmit={onSubmit}>
                <Input placeholder={"이름"} {...firstname} />
                <Input placeholder={"성"} {...lastname} />
                <Input type={"email"} placeholder={"이메일"} {...email} />
                <Input placeholder={"유저명"} {...nickname} />
                <Button text={"회원가입"} />
              </form>
            </>
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
        {action !== "confirm" && (
          <StateChanger>
            {action === "login" ? (
              <div>
                계정이 없다면&nbsp;
                <Link onClick={() => setAction("signup")}>회원가입</Link>
              </div>
            ) : (
              <div>
                계정이 있다면&nbsp;
                <Link onClick={() => setAction("login")}>로그인</Link>
              </div>
            )}
          </StateChanger>
        )}
      </Wrapper>
    </Container>
  );
};
