import React, { useState, useCallback } from "react";
import { useMutation } from "react-apollo-hooks";
import RecommandUserPresenter from "./RecommandUserPresenter";
import { FOLLOW, UNFOLLOW } from "../../query/user";

const RecommandUserContainer = ({
  id,
  avatar,
  nickname,
  email,
  isFollowing,
  isMe
}) => {
  const [ctrlIsFolling, setCtrlIsFolling] = useState(isFollowing);

  const [followMutation, { loading: followLoading }] = useMutation(FOLLOW);
  const [unfollowMutation, { loading: unfollowLoading }] = useMutation(
    UNFOLLOW
  );

  const handleFollow = useCallback(async () => {
    if (ctrlIsFolling) {
      if (unfollowLoading) return;

      const {
        data: { unfollow }
      } = await unfollowMutation({
        variables: { userId: id }
      });
      if (unfollow) {
        setCtrlIsFolling(false);
        alert("언팔로우 되었습니다.");
      }
    } else {
      if (followLoading) return;

      const {
        data: { follow }
      } = await followMutation({
        variables: { userId: id }
      });
      if (follow) {
        setCtrlIsFolling(true);
        alert("팔로우 되었습니다.");
      }
    }
  }, [ctrlIsFolling, followLoading, unfollowLoading]);

  return (
    <RecommandUserPresenter
      id={id}
      avatar={avatar}
      nickname={nickname}
      email={email}
      isFollowing={ctrlIsFolling}
      isMe={isMe}
      onFollow={handleFollow}
    />
  );
};

export default RecommandUserContainer;
