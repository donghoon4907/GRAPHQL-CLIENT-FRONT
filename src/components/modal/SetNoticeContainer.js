import React, { useCallback, useState, useEffect } from "react";
import { useMutation, useApolloClient } from "react-apollo-hooks";

import { ADD_NOTICE, UPDATE_NOTICE, DELETE_NOTICE } from "../../query/notice";
import SetNoticePresenter from "./SetNoticePresenter";
import { useInput, useLazyAxios } from "../../hooks";

export default props => {
  const client = useApolloClient();
  const { loading, call } = useLazyAxios();
  const title = useInput(props.title);
  const description = useInput(props.description);
  const [mdDescription, setMdDescription] = useState("");
  const [preview, setPreview] = useState("");
  const [action, setAction] = useState({
    code: props.action,
    modalTitle: props.actionText
  }); // readonly, modifiable, modify, add

  const [addNoticeMutation, { loading: addNoticeLoading }] = useMutation(
    ADD_NOTICE
  );

  const [updateNoticeMutation, { loading: updateNoticeLoading }] = useMutation(
    UPDATE_NOTICE
  );

  const [deleteNoticeMutation, { loading: deleteNoticeLoading }] = useMutation(
    DELETE_NOTICE
  );

  const convertTextIntoMd = async text => {
    if (!text) return alert("내용을 입력하세요.");

    const { data, error } = await call({
      method: "post",
      url: process.env.MDAPI_PATH,
      data: {
        text,
        mode: "gfm",
        context: "github/gollum"
      }
    });
    if (data) {
      const doc = new DOMParser().parseFromString(data, "text/html");
      return doc.body.innerHTML;
    } else if (error) {
      return null;
    }
  };

  const handlePreView = useCallback(async () => {
    if (loading) return;
    const md = await convertTextIntoMd(description.value);

    if (md) {
      setPreview(md);
    } else {
      alert("미리보기 로드에 실패했습니다.");
    }
  }, [description.value]);

  const handleRefreshPreview = useCallback(() => {
    setPreview("");
  }, []);

  const handleClose = useCallback(() => {
    client.writeData({
      data: {
        isShowNoticeModal: false
      }
    });
  }, []);

  const handleShowEdit = useCallback(() => {
    setAction({
      code: "modify",
      modalTitle: "수정"
    });
  }, []);

  const handleDelete = useCallback(async () => {
    if (deleteNoticeLoading) return alert("요청 중입니다.");

    const {
      data: { deleteNotice }
    } = await deleteNoticeMutation({
      variables: {
        noticeId: props.noticeId
      }
    });
    if (deleteNotice) {
      alert("공지사항이 삭제되었습니다.");
      window.location.reload();
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!title.value) {
      return alert("제목을 입력하세요.");
    }

    if (!description.value) {
      return alert("내용을 입력하세요.");
    }

    if (action.code === "add") {
      if (addNoticeLoading) return alert("요청 중입니다.");

      const {
        data: { addNotice }
      } = await addNoticeMutation({
        variables: {
          title: title.value,
          description: description.value
        }
      });
      if (addNotice) {
        alert("공지사항이 등록되었습니다.");
        window.location.reload();
      }
    } else if (action.code === "modify") {
      if (updateNoticeLoading) return alert("요청 중입니다.");

      const {
        data: { updateNotice }
      } = await updateNoticeMutation({
        variables: {
          title: title.value,
          description: description.value,
          noticeId: props.noticeId
        }
      });
      if (updateNotice) {
        alert("공지사항이 수정되었습니다.");
        window.location.reload();
      }
    }
  }, [
    action.code,
    title.value,
    description.value,
    addNoticeLoading,
    updateNoticeLoading
  ]);

  useEffect(() => {
    async function update(value) {
      const md = await convertTextIntoMd(value);
      if (md) {
        setMdDescription(md);
      }
    }
    if (props.description) {
      update(props.description);
    }
  }, []);

  return (
    <SetNoticePresenter
      action={action}
      isMaster={props.isMaster}
      title={title}
      description={description}
      mdDescription={mdDescription}
      preview={preview}
      onShowEdit={handleShowEdit}
      onPreview={handlePreView}
      onRefreshPreview={handleRefreshPreview}
      onClose={handleClose}
      onDelete={handleDelete}
      onSubmit={handleSubmit}
    />
  );
};
