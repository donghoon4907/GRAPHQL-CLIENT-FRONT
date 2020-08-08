import React, { useState, useCallback } from "react";
import { useMutation } from "react-apollo-hooks";
import { useHistory } from "react-router-dom";
import PostPresenter from "./PostPresenter";
import { LIKE_POST, DELETE_POST } from "../../query/post";

const PostContainer = ({
  id,
  title,
  description,
  createdAt,
  updatedAt,
  user,
  video,
  isLiked,
  likeCount,
  isMyPost,
  status,
  room
}) => {
  const history = useHistory();

  const [ctrlIsLiked, setCtrlIsLiked] = useState(isLiked);
  const [ctrlLikeCount, setCtrlLikeCount] = useState(likeCount);

  const [likeMutation, { loading: likeLoading }] = useMutation(LIKE_POST);
  const [deleteMutation, { loading: deleteLoading }] = useMutation(DELETE_POST);

  // 다운로드 이벤트
  const handleDown = useCallback(url => {
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
        alert("포스트 삭제 중 오류가 발생했습니다.");
      }
    }
  }, [deleteLoading]);

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
      likeCount={ctrlLikeCount}
      isMyPost={isMyPost}
      onClickLike={handleLike}
      onClickRoom={handleRoom}
      onClickDown={handleDown}
      onClickDelete={handleDelete}
    />
  );
};

export default PostContainer;
