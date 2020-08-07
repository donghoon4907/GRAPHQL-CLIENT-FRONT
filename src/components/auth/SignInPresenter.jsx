import React from "react";
import { Helmet } from "react-helmet";
import { FormWrapper, InputWrapper, Label } from "./StyledComponents";
import Input from "../common/Input";
import Button from "../common/Button";
import Loader from "../common/Loader";

export default ({ loading, email, pwd, onSubmit }) => {
  return (
    <FormWrapper>
      <Helmet>
        <title>로그인</title>
      </Helmet>
      {loading && <Loader />}
      <form onSubmit={onSubmit}>
        <InputWrapper>
          <Label htmlFor="email" val={email.value}>
            이메일
          </Label>
          <Input type="email" placeholder="이메일" name="email" {...email} />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="password" val={pwd.value}>
            암호
          </Label>
          <Input type="password" placeholder="암호" name="password" {...pwd} />
        </InputWrapper>
        <Button text={"로그인"} />
      </form>
    </FormWrapper>
  );
};
