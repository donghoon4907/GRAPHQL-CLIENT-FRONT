import React from "react";
import styled from "styled-components";
import Avatar from "../common/Avatar";
import Button from "../common/Button";

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

export default ({ avatar, nickname, isFollowing, email, onFollow }) => (
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
      <Button text={isFollowing ? "팔로우" : "언팔로우"} />
    </FollowWrap>
  </Contianer>
);
