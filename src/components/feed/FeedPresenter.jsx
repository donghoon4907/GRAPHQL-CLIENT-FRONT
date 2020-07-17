import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Section from "../common/Section";
import InfiniteScroll from "react-infinite-scroller";
import PostContainer from "../post/PostContainer";

const NoData = styled.div`
  width: 100%;
  text-align: center;
`;

export default ({ data: { getFeed }, onFetchMore }) => {
  return (
    <Section>
      <Helmet>
        <title>피드</title>
      </Helmet>
      <InfiniteScroll loadMore={onFetchMore} hasMore={false}>
        {getFeed.length > 0 ? (
          getFeed.map((post) => <PostContainer key={post.id} {...post} />)
        ) : (
          <NoData>
            <h1>검색 결과가 없습니다.</h1>
          </NoData>
        )}
      </InfiniteScroll>
    </Section>
  );
};
