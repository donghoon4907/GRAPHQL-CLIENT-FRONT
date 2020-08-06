import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Section from "../common/Section";
import InfiniteScroll from "react-infinite-scroller";
import PostContainer from "../post/PostContainer";
import Notice from "../common/Notice";
import { Add } from "../icon";
import Link from "../common/Link";

const PostWrap = styled.div`
  width: 600px;

  ${props => props.theme.smallQuery`
    width: 100%;
  `}
`;

const UserWrap = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  justfiy-content: space-between;
  margin-left: 20px;
  ${props => props.theme.smallQuery`
    display: none;
  `}

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
  border-bottom: 2px solid black;
  padding: 10px 5px;
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

export default ({
  data: { getPosts },
  notices,
  profile,
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
            <Subject>
              <span>공지사항</span>
              <div>{profile.isMaster && <Add />}</div>
            </Subject>
            {notices.length > 0 ? (
              notices.map(notice => <Notice key={notice.id} {...notice} />)
            ) : (
              <NoData>
                <h1>공지사항이 없습니다.</h1>
              </NoData>
            )}
          </StickyWrap>
        </aside>
      </UserWrap>
    </Section>
  );
};
