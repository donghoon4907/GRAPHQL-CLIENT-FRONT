import React, { useState } from "react";
import SignIn from "./SignInContainer";
import SignUp from "./SignUpContainer";
import { Container, Wrapper, StateChanger, Link } from "./StyledComponents";

export default () => {
  const [action, setAction] = useState("login");
  return (
    <Container>
      <Wrapper>
        {action === "signup" ? <SignUp setAction={setAction} /> : <SignIn />}
        <StateChanger>
          {action === "login" && (
            <div>
              계정이 없다면&nbsp;
              <Link onClick={() => setAction("signup")}>회원가입</Link>
            </div>
          )}
          {action === "signup" && (
            <div>
              계정이 있다면&nbsp;
              <Link onClick={() => setAction("login")}>로그인</Link>
            </div>
          )}
        </StateChanger>
      </Wrapper>
    </Container>
  );
};
