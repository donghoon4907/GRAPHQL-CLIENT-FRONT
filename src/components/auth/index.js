import React, { useState } from "react";
import SignIn from "./SignInContainer";
import SignUp from "./SignUpContainer";

export default () => {
  const [action, setAction] = useState("login");
  return action === "signup" ? (
    <SignUp action={action} setAction={setAction} />
  ) : (
    <SignIn action={action} setAction={setAction} />
  );
};
