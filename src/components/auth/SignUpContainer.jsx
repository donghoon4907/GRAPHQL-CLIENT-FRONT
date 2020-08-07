import React, { useState, useCallback, useRef } from "react";
import { useMutation } from "react-apollo-hooks";
import axios from "axios";
import { useInput } from "../../hooks";
import SignUpPresenter from "./SignUpPresenter";
import { ADD_USER } from "../../query/user";

export default ({ setAction }) => {
  const fileEl = useRef(null);
  const confirmPwdEl = useRef(null);

  const nickname = useInput("");
  const email = useInput("");
  const pwd = useInput("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState("");

  const [addUserMutation, { loading }] = useMutation(ADD_USER);

  const handleChangeConfirmPwd = useCallback(
    e => {
      const { value } = e.target;
      setConfirmPwd(value);
      if (pwd.value !== value) {
        confirmPwdEl.current.setCustomValidity("비밀번호가 일치하지 않습니다.");
        return;
      } else {
        confirmPwdEl.current.setCustomValidity("");
      }
    },
    [pwd.value]
  );

  const handleChangePreview = useCallback(async e => {
    if (!e.target.value) return; // prevent cancel action

    const [file] = e.target.files;

    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axios.post(
      `${process.env.BACKEND_PATH}api/upload`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data"
        }
      }
    );
    if (data) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result);
        setFile(data);
      };

      reader.readAsDataURL(file);
    }
  }, []);

  const handleClickUpload = useCallback(() => {
    fileEl.current.click();
  }, []);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      if (loading) return;

      const {
        data: { addUser }
      } = await addUserMutation({
        variables: {
          email: email.value,
          pwd: pwd.value,
          nickname: nickname.value,
          file: file ? file : process.env.DEFAULT_AVATAR
        }
      });
      if (addUser) {
        setAction("login");
        alert("회원가입이 정상처리되었습니다.");
      } else {
        alert("요청 중 오류가 발생했습니다.");
      }
    },
    [email.value, pwd.value, confirmPwd.value, nickname.value, file, loading]
  );

  return (
    <SignUpPresenter
      loading={loading}
      nickname={nickname}
      email={email}
      pwd={pwd}
      confirmPwd={confirmPwd}
      preview={preview}
      fileEl={fileEl}
      confirmPwdEl={confirmPwdEl}
      handleChangePreview={handleChangePreview}
      handleChangeConfirmPwd={handleChangeConfirmPwd}
      handleClickUpload={handleClickUpload}
      handleSubmit={handleSubmit}
    />
  );
};
