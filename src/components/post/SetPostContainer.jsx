import React, { useState, useRef, useCallback } from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import axios from "axios";
import { useInput } from "../../hooks";
import { GET_POST, ADD_POST, UPDATE_POST } from "../../query/post";
import SetPostPresenter from "./SetPostPresenter";

export default ({ location: { pathname } }) => {
  const [_, __, postId] = pathname.split("/");

  const { data } = useQuery(GET_POST, {
    variables: {
      postId: postId
    },
    skip: postId === "new",
    suspend: true
  });

  const fileEl = useRef(null);
  const title = useInput(postId === "new" ? "" : data.getPost.title);
  const description = useInput(
    postId === "new" ? "" : data.getPost.description
  );
  const status = useInput(postId === "new" ? "PUBLIC" : data.getPost.status);
  const [progress, setProgress] = useState(postId === "new" ? 0 : 100);
  const [file, setFile] = useState(
    postId === "new" ? "" : data.getPost.video.url
  );

  const [setPostMutation, { loading }] = useMutation(
    postId === "new" ? ADD_POST : UPDATE_POST
  );

  const handleClickUpload = useCallback(() => {
    fileEl.current.click();
  }, []);

  const handleChangeFile = useCallback(async (e) => {
    if (!e.target.value) return; // cancel select file

    const { files } = e.target;

    const formData = new FormData();
    formData.append("file", files[0]);

    const response = await axios.post(
      `${process.env.BACKEND_PATH}api/upload`,
      formData,
      {
        onUploadProgress: ({ lengthComputable, loaded, total }) => {
          if (lengthComputable) {
            setProgress(Math.floor((loaded / total) * 100));
          }
        }
      }
    );
    if (response.data) {
      setFile(response.data);
    }
  }, []);

  const handleSetPost = useCallback(
    async (e) => {
      e.preventDefault();
      if (loading) return;
      if (!file) return alert("영상을 선택하세요.");
      if (progress > 0 && progress < 100) return alert("업로드 진행 중입니다.");
      const {
        data: { addPost, updatePost }
      } = await setPostMutation({
        variables: {
          postId,
          title: title.value,
          description: description.value,
          status: status.value,
          file
        }
      });
      if (addPost || updatePost) {
        alert(`포스트가 ${postId === "new" ? "등록" : "수정"} 되었습니다.`);
      } else {
        alert("요청 중 오류가 발생했습니다.");
      }
    },
    [title.value, description.value, status.value, file]
  );
  return (
    <SetPostPresenter
      data={data}
      loading={loading}
      title={title}
      description={description}
      status={status}
      progress={progress}
      fileEl={fileEl}
      onClickUpload={handleClickUpload}
      onChangeFile={handleChangeFile}
      onSubmit={handleSetPost}
    />
  );
};
