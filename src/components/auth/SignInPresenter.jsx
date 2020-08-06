import React from "react";
import { Helmet } from "react-helmet";
import { FormWrapper } from "./StyledComponents";
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
        <Input type={"email"} placeholder={"이메일"} {...email} />
        <Input type={"password"} placeholder={"암호"} {...pwd} />
        <Button text={"로그인"} />
      </form>
    </FormWrapper>
  );
};
