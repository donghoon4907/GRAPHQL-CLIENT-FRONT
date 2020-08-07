import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Section from "../common/Section";
import InfiniteScroll from "react-infinite-scroller";
import PostContainer from "../post/PostContainer";
import { Add } from "../icon";
import { Carousel } from "react-bootstrap";
import CarouselContainer from "../common/Carousel";
import Timestamp from "../common/Timestamp";
import SetNoticeModal from "../modal/SetNoticeContainer";

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
`;

export default ({
  data: { getPosts },
  notices,
  profile,
  onShowNoticeModal,
  onFetchMore,
  recommandUserEl
}) => {
  return (
    <Section flexDirection="row">
      <Helmet>
        <title>피드</title>
      </Helmet>
      <PostWrap>
        <Subject>최근 업로드</Subject>
        <InfiniteScroll loadMore={onFetchMore} hasMore={false}>
          {getPosts.length > 0 ? (
            getPosts.map(post => <PostContainer key={post.id} {...post} />)
          ) : (
            <NoData>
              <h1>게시글이 없습니다.</h1>
            </NoData>
          )}
        </InfiniteScroll>
      </PostWrap>
      <UserWrap ref={recommandUserEl}>
        <aside>
          <StickyWrap>
            <div>
              <Subject activeBorder>
                <span>공지사항</span>
                <div>
                  {profile.isMaster && (
                    <div onClick={onShowNoticeModal}>
                      <Add />
                    </div>
                  )}
                </div>
              </Subject>
              {notices.length > 0 ? (
                <CarouselContainer>
                  {notices.map(notice => (
                    <Carousel.Item key={notice.id}>
                      <NoticeWrapper>
                        <div>{notice.title}</div>
                        <Timestamp text={notice.updatedAt} />
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
      <SetNoticeModal />
    </Section>
  );
};
