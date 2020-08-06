import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { FormWrapper } from "./StyledComponents";
import Input from "../common/Input";
import Button from "../common/Button";
import Loader from "../common/Loader";
import { Thumbnail } from "../icon";

const UploadWrapper = styled.div`
  width: 100%;
  height: 150px;
  ${props => props.theme.whiteBox}
  ${props => props.theme.flexCenter}
  margin-bottom: 10px;
  cursor: pointer;

  & img {
    width: 100%;
    height: 100%;
  }
`;

export default ({
  loading,
  nickname,
  firstname,
  lastname,
  email,
  pwd,
  confirmPwd,
  preview,
  fileEl,
  confirmPwdEl,
  handleChangePreview,
  handleChangeConfirmPwd,
  handleClickUpload,
  handleSubmit
}) => {
  return (
    <FormWrapper>
      <Helmet>
        <title>회원가입</title>
      </Helmet>
      {loading && <Loader />}
      <form onSubmit={handleSubmit}>
        <UploadWrapper onClick={handleClickUpload}>
          {preview ? (
            <img src={preview} alt="avatar" title="변경하려면 클릭하세요." />
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
        <Input type={"password"} placeholder={"암호"} {...pwd} />
        <Input
          type={"password"}
          placeholder={"암호 확인"}
          value={confirmPwd}
          onChange={handleChangeConfirmPwd}
          ref={confirmPwdEl}
        />
        <Input placeholder={"유저명"} {...nickname} />
        <Button text={"회원가입"} />
      </form>
    </FormWrapper>
  );
};
