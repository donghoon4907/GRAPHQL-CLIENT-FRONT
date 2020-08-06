import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";

const Contianer = styled.li`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
`;

const AvatarWrap = styled.div`
  padding: 5px;
`;

const NicknameWrap = styled.div`
  flex: 1;
`;

const FollowWrap = styled.div`
  width: 60px;
`;

function RecommandUser({ id, avatar, nickname, isFollowing }) {
  return (
    <Contianer>
      <AvatarWrap>
        <Avatar
          size="30"
          src={
            avatar
              ? avatar.url
              : `${process.env.S3_IMAGE_PATH}${process.env.DEFAULT_AVATAR}`
          }
        />
      </AvatarWrap>
      <NicknameWrap>{nickname}</NicknameWrap>
      <FollowWrap>
        <FollowButton isFollowing={isFollowing} userId={id} />
      </FollowWrap>
    </Contianer>
  );
}

export default RecommandUser;

RecommandUser.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.object,
  nickname: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired
};
