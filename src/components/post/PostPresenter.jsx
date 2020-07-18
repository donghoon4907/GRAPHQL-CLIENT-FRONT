import React from "react";
import styled from "styled-components";
import {
  OverlayTrigger,
  Popover,
  Dropdown,
  ButtonGroup
} from "react-bootstrap";
import moment from "moment";
import Avatar from "../common/Avatar";
import Video from "../common/Video";
import Link from "../common/Link";
import {
  HeartFull,
  HeartEmpty,
  Accept,
  Permit,
  Private,
  Room,
  Download,
  More
} from "../icon";

const Container = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  margin-bottom: 60px;
`;

const Header = styled.div`
  padding: 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.bgColor};
`;

const User = styled.div`
  position: relative;
  width: 200px;
  display: flex;
  align-items: center;
`;

const Body = styled.div`
  padding: 15px;
  border-top: ${(props) => props.theme.boxBorder};
  border-bottom: ${(props) => props.theme.boxBorder};
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
`;

const Description = styled(Title)`
  top: 30px;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 0;
`;

const Footer = styled.div`
  padding: 15px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Icon = styled.span`
  margin-right: 10px;
`;

const Timestamp = styled.div`
  font-weight: 400;
  opacity: 0.5;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
  float: right;
`;

const DownloadItem = styled.div`
  display: inline-block;
  width: 100%;
`;

const DownloadLink = styled.a`
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  background: ${(props) => props.theme.blueColor};
  text-align: center;
  padding: 7px 0;
  font-size: 14px;

  &:hover {
    color: white;
    text-decoration: none;
  }
`;

const MoreWrapper = styled.div`
  position: relative;

  & #dropdown-custom-2 {
    position: absolute;
    top: -20px;
    right: 0;
    opacity: 0;
    z-index: 1;
  }

  & svg {
    width: 20px;
    height: 20px;
    fill: gray;
    cursor: pointer;
    position: absolute;
    top: -10px;
    right: 0;
  }
`;

export default ({
  id,
  title,
  description,
  status,
  createdAt,
  user,
  video,
  isLiked,
  isAccepted,
  likeCount,
  acceptCount,
  isMyPost,
  onClickLike,
  onClickAccept,
  onClickRoom,
  onClickDelete
}) => (
  <Container>
    <Header>
      <User>
        <Link pathname={`/user/${user.id}`}>
          <Avatar
            size="30"
            src={
              user.avatar
                ? user.avatar.url
                : `${process.env.S3_IMAGE_PATH}${process.env.DEFAULT_AVATAR}`
            }
          />
        </Link>

        <div style={{ textIndent: 10 }}>{user.nickname}</div>
      </User>
      <div style={{ width: 100, textAlign: "right" }}>
        {isMyPost && (
          <Dropdown as={ButtonGroup}>
            <MoreWrapper>
              <Dropdown.Toggle
                id="dropdown-custom-2"
                style={{
                  position: "absolute",
                  top: -20,
                  right: 0,
                  opacity: 0,
                  zIndex: 1
                }}
              />
              <More />
            </MoreWrapper>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="1">
                <Link pathname={`/post/${id}`}>포스트 수정</Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="2" onClick={onClickDelete}>
                포스트 삭제
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </Header>
    <Video src={video.url_240p} />
    <Body>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Body>
    <Footer>
      <IconWrapper>
        <div>
          <Icon onClick={onClickLike}>
            {isLiked ? <HeartFull /> : <HeartEmpty />}
          </Icon>
          <Icon>{likeCount.toLocaleString()}</Icon>
          {/* <Icon>
            {status === "PUBLIC" ? (
              isAccepted || isMyPost ? (
                <Permit />
              ) : (
                <Accept onClick={onClickAccept} />
              )
            ) : (
              <Private />
            )}
          </Icon> */}
          {/* {status === "PUBLIC" && <Icon>{acceptCount.toLocaleString()}</Icon>} */}
          <Icon>
            <Room onClick={onClickRoom} />
          </Icon>

          <OverlayTrigger
            trigger="click"
            placement="right"
            overlay={
              <Popover id="popover-basic">
                <Popover.Title as="h3">다운로드</Popover.Title>
                <Popover.Content
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "auto"
                  }}
                >
                  <DownloadItem>
                    <DownloadLink href={video.url} download>
                      기본
                    </DownloadLink>
                  </DownloadItem>
                </Popover.Content>
              </Popover>
            }
          >
            <Icon>
              <Download />
            </Icon>
          </OverlayTrigger>
        </div>
        <Timestamp>{moment(createdAt).format("YYYY-MM-DD HH:mm:ss")}</Timestamp>
      </IconWrapper>
    </Footer>
  </Container>
);
