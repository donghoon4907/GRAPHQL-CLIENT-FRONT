import React, { useState, useCallback } from "react";
import { useMutation } from "react-apollo-hooks";
import UserPresenter from "./UserPresenter";
import { FOLLOW, UNFOLLOW } from "../../query/user";

const UserContainer = ({
  id,
  avatar,
  nickname,
  email,
  followedBy,
  following,
  posts,
  isFollowing,
  isMe
}) => {
  const [ctrlIsFolling, setCtrlIsFolling] = useState(isFollowing);
  const [followedByCount, setFollowedByCount] = useState(followedBy.length);

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
        setFollowedByCount(followedByCount - 1);
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
        setFollowedByCount(followedByCount + 1);
        alert("팔로우 되었습니다.");
      }
    }
  }, [ctrlIsFolling, followedByCount, followLoading, unfollowLoading]);

  return (
    <UserPresenter
      id={id}
      avatar={avatar}
      nickname={nickname}
      email={email}
      isFollowing={ctrlIsFolling}
      isMe={isMe}
      followedByCount={followedByCount}
      folowingCount={following.length}
      postCount={posts.length}
      onFollow={handleFollow}
    />
  );
};

export default UserContainer;
