import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Section from "../common/Section";
import PostContainer from "../post/PostContainer";
import { Add } from "../icon";
import { Carousel } from "react-bootstrap";
import CarouselContainer from "../common/Carousel";
import Timestamp from "../common/Timestamp";
import SetNoticeModal from "../modal/SetNoticeContainer";
import MoreLoader from "../common/MoreLoader";

const PostWrap = styled.div`
  ${props => props.theme.smallQuery`width: 100%;`}
  width: 600px;
`;

const UserWrap = styled.div`
  ${props => props.theme.smallQuery`display: none;`}
  width: 300px;
  display: flex;
  flex-direction: column;
  justfiy-content: space-between;
  margin-left: 20px;

  & > aside {
    flex: 1;
  }
`;

const StickyWrap = styled.div`
  position: sticky;
  top: 80px;
`;

const Subject = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${props => props.activeBorder && "2px solid black"};
  padding: 8px 5px;
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: 500;

  & svg {
    width: 20px;
    height: 20px;
  }
`;

const NoData = styled.div`
  width: 100%;
  text-align: center;
`;

const NoticeWrapper = styled.div`
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 15%;
  margin-left: 15%;
  padding: 5px;
  text-align: center;
  cursor: pointer;
`;

export default ({
  data: { getPosts },
  loading,
  profile,
  notice,
  notices,
  isShowNoticeModal,
  onShowNotice,
  onAddNotice,
  recommandUserEl
}) => {
  return (
    <Section flexDirection="row">
      <Helmet>
        <title>피드</title>
      </Helmet>
      <PostWrap>
        <Subject>최근 업로드</Subject>
        {getPosts.length > 0 ? (
          getPosts.map(post => <PostContainer key={post.id} {...post} />)
        ) : (
          <NoData>
            <h1>게시글이 없습니다.</h1>
          </NoData>
        )}
        {loading && <MoreLoader />}
      </PostWrap>
      <UserWrap ref={recommandUserEl}>
        <aside>
          <StickyWrap>
            <div>
              <Subject activeBorder>
                <span>공지사항</span>
                <div>
                  {profile.isMaster && (
                    <div onClick={onAddNotice}>
                      <Add />
                    </div>
                  )}
                </div>
              </Subject>
              {notices.length > 0 ? (
                <CarouselContainer>
                  {notices.map(({ id, title, description, updatedAt }) => (
                    <Carousel.Item key={id}>
                      <NoticeWrapper
                        onClick={() => onShowNotice(title, description, id)}
                      >
                        <div>{title}</div>
                        <Timestamp text={updatedAt} />
                      </NoticeWrapper>
                    </Carousel.Item>
                  ))}
                </CarouselContainer>
              ) : (
                <NoData>
                  <h1>공지사항이 없습니다.</h1>
                </NoData>
              )}
            </div>
          </StickyWrap>
        </aside>
      </UserWrap>
      {isShowNoticeModal && (
        <SetNoticeModal {...notice} isMaster={profile.isMaster} />
      )}
    </Section>
  );
};
