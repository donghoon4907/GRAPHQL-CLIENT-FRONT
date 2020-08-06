import React, { useState, useCallback } from "react";
import { useMutation } from "react-apollo-hooks";
import PropTypes from "prop-types";
import Button from "./Button";
import { FOLLOW, UNFOLLOW } from "../../query/user";

function FollowButton({ isFollowing, userId }) {
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
        variables: { userId }
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
        variables: { userId }
      });
      if (follow) {
        setCtrlIsFolling(true);
        alert("팔로우 되었습니다.");
      }
    }
  }, [ctrlIsFolling, followLoading, unfollowLoading]);

  return (
    <Button
      text={ctrlIsFolling ? "언팔로우" : "팔로우"}
      onClick={handleFollow}
    />
  );
}
export default FollowButton;

FollowButton.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired
};
