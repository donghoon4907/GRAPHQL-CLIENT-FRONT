import React, { useState, useRef, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo-hooks";
import axios from "axios";
import { GET_POST, ADD_POST, UPDATE_POST } from "../../query/post";
import SetPostPresenter from "./SetPostPresenter";
import Loader from "../common/Loader";

export default ({ location: { pathname } }) => {
  const [_, __, postId] = pathname.split("/");
  const history = useHistory();

  const { data, loading } = useQuery(GET_POST, {
    variables: {
      postId: postId
    },
    skip: postId === "new"
  });

  const fileEl = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PUBLIC");
  const [progress, setProgress] = useState(postId === "new" ? 0 : 100);
  const [file, setFile] = useState("");

  const [setPostMutation, { loading: setPostLoading }] = useMutation(
    postId === "new" ? ADD_POST : UPDATE_POST
  );

  const handleChangeTitle = useCallback(e => {
    setTitle(e.target.value);
  }, []);

  const handleChangeDescription = useCallback(e => {
    setDescription(e.target.value);
  }, []);

  const handleChangeStatus = useCallback(e => {
    setStatus(e.target.value);
  }, []);

  const handleClickUpload = useCallback(() => {
    fileEl.current.click();
  }, []);

  const handleChangeFile = useCallback(async e => {
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
    async e => {
      e.preventDefault();
      if (setPostLoading) return;
      if (!file) return alert("영상을 선택하지 않았거나 업로드 진행 중입니다.");
      if (progress > 0 && progress < 100) return alert("업로드 진행 중입니다.");
      const {
        data: { addPost, updatePost }
      } = await setPostMutation({
        variables: {
          postId,
          title,
          description,
          status,
          file
        }
      });
      if (addPost || updatePost) {
        alert(`포스트가 ${postId === "new" ? "등록" : "수정"} 되었습니다.`);
        if (postId === "new") {
          history.push("/");
        }
      } else {
        alert("요청 중 오류가 발생했습니다.");
      }
    },
    [title, description, status, file, setPostLoading]
  );

  useEffect(() => {
    if (!loading && data) {
      setTitle(data.getPost.title);
      setDescription(data.getPost.description);
      setStatus(data.getPost.status);
      setFile(data.getPost.video.url);
    }
  }, [loading, data]);

  if (loading) {
    return <Loader />;
  }

  return (
    <SetPostPresenter
      data={data}
      loading={setPostLoading}
      title={title}
      description={description}
      status={status}
      progress={progress}
      fileEl={fileEl}
      onClickUpload={handleClickUpload}
      onChangeTitle={handleChangeTitle}
      onChangeDescription={handleChangeDescription}
      onChangeStatus={handleChangeStatus}
      onChangeFile={handleChangeFile}
      onSubmit={handleSetPost}
    />
  );
};
