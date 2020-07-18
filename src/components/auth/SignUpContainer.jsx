import React, { useState, useCallback, useRef } from "react";
import { useMutation } from "react-apollo-hooks";
import axios from "axios";
import { useInput } from "../../hooks";
import SignUpPresenter from "./SignUpPresenter";
import { showToast } from "../../module/toast";
import { ADD_USER } from "../../query/user";

export default ({ action, setAction }) => {
  const fileEl = useRef(null);

  const nickname = useInput("");
  const firstname = useInput("");
  const lastname = useInput("");
  const email = useInput("");
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState("");

  const [addUserMutation, { loading: addUserLoading }] = useMutation(ADD_USER);

  const handleChangePreview = useCallback(async (e) => {
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
    async (e) => {
      e.preventDefault();

      if (action === "signup") {
        if (addUserLoading) return;

        const {
          data: { addUser }
        } = await addUserMutation({
          variables: {
            email: email.value,
            nickname: nickname.value,
            firstname: firstname.value,
            lastname: lastname.value,
            file
          }
        });
        if (addUser) {
          setAction("login");
          showToast({
            type: "success",
            message: "회원가입이 정상처리되었습니다."
          });
        }
      }
    },
    [
      email.value,
      nickname.value,
      firstname.value,
      lastname.value,
      file,
      addUserLoading
    ]
  );

  return (
    <SignUpPresenter
      action={action}
      setAction={setAction}
      nickname={nickname}
      firstname={firstname}
      lastname={lastname}
      email={email}
      preview={preview}
      fileEl={fileEl}
      handleChangePreview={handleChangePreview}
      handleClickUpload={handleClickUpload}
      handleSubmit={handleSubmit}
    />
  );
};
