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
import styled from "styled-components";
import { Thumbnail } from "../icon";

const UploadWrapper = styled.div`
  width: 100%;
  height: 150px;
  ${(props) => props.theme.whiteBox}
  ${(props) => props.theme.flexCenter}
  margin-bottom: 10px;
  cursor: pointer;

  & img {
    width: 100%;
    height: 100%;
  }
`;

export default ({
  action,
  setAction,
  nickname,
  firstname,
  lastname,
  email,
  preview,
  fileEl,
  handleChangePreview,
  handleClickUpload,
  handleSubmit
}) => {
  return (
    <Container>
      <Wrapper>
        <Form>
          {action === "signup" && (
            <>
              <Helmet>
                <title>회원가입</title>
              </Helmet>
              <form onSubmit={handleSubmit}>
                <UploadWrapper onClick={handleClickUpload}>
                  {preview ? (
                    <img
                      src={preview}
                      alt="avatar"
                      title="변경하려면 클릭하세요."
                    />
                  ) : (
                    <Thumbnail style={{ width: 100, height: 50 }} />
                  )}

                  <input
                    type="file"
                    onChange={handleChangePreview}
                    ref={fileEl}
                    hidden
                    accept="image/jpg, image/jpeg, image/png"
                  />
                </UploadWrapper>
                <Input placeholder={"이름"} {...firstname} />
                <Input placeholder={"성"} {...lastname} />
                <Input type={"email"} placeholder={"이메일"} {...email} />
                <Input placeholder={"유저명"} {...nickname} />
                <Button text={"회원가입"} />
              </form>
            </>
          )}
        </Form>
        <StateChanger>
          <div>
            계정이 있다면&nbsp;
            <Link onClick={() => setAction("login")}>로그인</Link>
          </div>
        </StateChanger>
      </Wrapper>
    </Container>
  );
};
