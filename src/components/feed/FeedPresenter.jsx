import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Section from "../common/Section";
import InfiniteScroll from "react-infinite-scroller";
import PostContainer from "../post/PostContainer";
import RecommandUserContainer from "../user/RecommandUserContainer";

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

const Subject = styled.h3`
  border-bottom: 3px solid black;
  padding: 1rem 5px;
  font-size: 24px;
  margin-bottom: 5px;
  font-weight: 500;
`;

const NoData = styled.div`
  width: 100%;
  text-align: center;
`;

export default ({
  data: { getPosts },
  users,
  onFetchMore,
  recommandUserEl
}) => {
  return (
    <Section flexDirection="row">
      <Helmet>
        <title>피드</title>
      </Helmet>
      <PostWrap>
        <Subject>최근 업로드된 게시글</Subject>
        <InfiniteScroll loadMore={onFetchMore} hasMore={false}>
          {getPosts.length > 0 ? (
            getPosts.map(post => <PostContainer key={post.id} {...post} />)
          ) : (
            <NoData>
              <h1>게시물이 없습니다.</h1>
            </NoData>
          )}
        </InfiniteScroll>
      </PostWrap>
      <UserWrap ref={recommandUserEl}>
        <aside>
          <StickyWrap>
            <Subject>추천 팔로워</Subject>
            {users.map(user => (
              <RecommandUserContainer key={user.id} {...user} />
            ))}
          </StickyWrap>
        </aside>
      </UserWrap>
    </Section>
  );
};
