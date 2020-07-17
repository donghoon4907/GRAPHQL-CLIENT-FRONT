import React, { useState, useCallback } from "react";
import { useMutation } from "react-apollo-hooks";
import { useHistory } from "react-router-dom";
import PostPresenter from "./PostPresenter";
import { LIKE_POST, ACCEPT_POST, DELETE_POST } from "../../query/post";
import { showToast } from "../../module/toast";

const PostContainer = ({
  id,
  title,
  description,
  createdAt,
  updatedAt,
  user,
  video,
  isLiked,
  isAccepted,
  likeCount,
  acceptCount,
  isMyPost,
  status,
  room
}) => {
  const history = useHistory();

  const [ctrlIsLiked, setCtrlIsLiked] = useState(isLiked);
  const [ctrlLikeCount, setCtrlLikeCount] = useState(likeCount);

  const [likeMutation, { loading: likeLoading }] = useMutation(LIKE_POST);
  const [acceptMutation, { loading: acceptLoading }] = useMutation(ACCEPT_POST);
  const [deleteMutation, { loading: deleteLoading }] = useMutation(DELETE_POST);

  // 다운로드 이벤트
  const handleDown = useCallback((url) => {
    location.href = url;
  }, []);

  // 포스트 채팅방 접근 이벤트
  const handleRoom = useCallback(() => {
    history.push(`/room/${room.id}`);
  }, []);

  // 좋아요 / 좋아요 취소 이벤트
  const handleLike = useCallback(async () => {
    if (likeLoading) return;

    const {
      data: { likePost }
    } = await likeMutation({
      variables: { postId: id }
    });

    if (likePost) {
      if (ctrlIsLiked) {
        setCtrlIsLiked(false);
        setCtrlLikeCount(ctrlLikeCount - 1);
      } else {
        setCtrlIsLiked(true);
        setCtrlLikeCount(ctrlLikeCount + 1);
      }
    }
  }, [ctrlIsLiked, ctrlLikeCount, likeLoading]);

  // 삭제 이벤트
  const handleDelete = useCallback(async () => {
    if (deleteLoading) return;
    if (confirm("해당 포스트를 삭제하시겠습니까?")) {
      const {
        data: { deletePost }
      } = await deleteMutation({
        variables: { postId: id }
      });

      if (deletePost) {
        alert("해당 포스트가 삭제되었습니다.");
        window.location.reload();
      } else {
        showToast({
          type: "error",
          message: "포스트 삭제 중 오류가 발생했습니다."
        });
      }
    }
  }, [deleteLoading]);

  // 요청 이벤트
  const handleAccept = useCallback(async () => {
    if (acceptLoading) return;

    const {
      data: { acceptPost }
    } = await acceptMutation({
      variables: { postId: id }
    });

    if (acceptPost) {
      showToast({
        type: "success",
        message: "요청 되었습니다."
      });
    } else {
      showToast({
        type: "info",
        message: "이미 요청했습니다."
      });
    }
  }, [acceptLoading]);

  return (
    <PostPresenter
      id={id}
      status={status}
      title={title}
      description={description}
      createdAt={createdAt}
      updatedAt={updatedAt}
      user={user}
      video={video}
      isLiked={ctrlIsLiked}
      isAccepted={isAccepted}
      likeCount={ctrlLikeCount}
      acceptCount={acceptCount}
      isMyPost={isMyPost}
      onClickLike={handleLike}
      onClickAccept={handleAccept}
      onClickRoom={handleRoom}
      onClickDown={handleDown}
      onClickDelete={handleDelete}
    />
  );
};

export default PostContainer;
