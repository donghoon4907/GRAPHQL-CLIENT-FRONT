import React from "react";
import styled from "styled-components";
import Avatar from "../common/Avatar";
import Button from "../common/Button";

const Contianer = styled.div`
  width: 100%;
  ${(props) => props.theme.whiteBox}
  display: flex;
  flex-direction: row;
  position: relative;
  height: auto;
  background: rgba(0, 0, 0, 0.03);

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

const AvatarWrapper = styled.div`
  ${(props) => props.theme.flexCenter};
  padding: 2rem;

  @media (max-width: 720px) {
    flex: 1;
    padding: 1rem;

    & > div {
      width: 200px;
      height: 200px;
    }
  }
`;

const Body = styled.div`
  flex: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 720px) {
    padding: 1rem;
  }
`;

const Nickname = styled.div`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;

  @media (max-width: 720px) {
    text-align: center;
    justify-content: center;
    flex-direction: row;
  }
`;

const Email = styled.div`
  font-size: 24px;
  padding-bottom: 3rem;

  @media (max-width: 720px) {
    text-align: center;
    padding-bottom: 1rem;
  }
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: row;
  border: ${(props) => props.theme.boxBorder};
`;

const PostInfoHeader = styled.div`
  flex: 1;
  ${(props) => props.theme.flexCenter};
  padding: 1rem;
  background: rgba(0, 0, 0, 0.03);
  font-size: 20px;
  & + & {
    border-left: ${(props) => props.theme.boxBorder};
  }
`;

const PostInfoItem = styled(PostInfoHeader)`
  background: white;
  font-weight: 600;
  font-size: 18px;
`;

export default ({
  id,
  avatar,
  nickname,
  isFollowing,
  email,
  isMe,
  followedByCount,
  folowingCount,
  postCount,
  onFollow
}) => (
  <Contianer key={id}>
    <AvatarWrapper>
      <Avatar
        size="250"
        src={
          avatar
            ? avatar.url
            : `${process.env.S3_IMAGE_PATH}${process.env.DEFAULT_AVATAR}`
        }
      />
    </AvatarWrapper>
    <Body>
      <Nickname>
        <div>{nickname}</div>
        {!isMe && (
          <div style={{ width: 100, paddingLeft: 10 }}>
            <Button
              text={isFollowing ? "언팔로우" : "팔로우"}
              onClick={onFollow}
            />
          </div>
        )}
      </Nickname>
      <Email>{email}</Email>
      <PostInfo>
        <PostInfoHeader>포스트</PostInfoHeader>
        <PostInfoHeader>팔로워</PostInfoHeader>
        <PostInfoHeader>팔로잉</PostInfoHeader>
      </PostInfo>
      <PostInfo>
        <PostInfoItem>{postCount.toLocaleString()}</PostInfoItem>
        <PostInfoItem>{followedByCount.toLocaleString()}</PostInfoItem>
        <PostInfoItem>{folowingCount.toLocaleString()}</PostInfoItem>
      </PostInfo>
    </Body>
  </Contianer>
);
