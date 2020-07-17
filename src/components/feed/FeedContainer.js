import React, { useCallback } from "react";
import { useQuery } from "react-apollo-hooks";
import FeedPresenter from "./FeedPresenter";
import { GET_FEED } from "../../query/auth";

export default () => {
  const { data, fetchMore } = useQuery(GET_FEED, {
    suspend: true
  });

  const handleFetchMore = useCallback(() => {
    if (data && data.getFeed) {
      fetchMore({
        variables: {
          skip: data.getFeed.length
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            getFeed: [...prev.getFeed, ...fetchMoreResult.getFeed]
          });
        }
      });
    }
  }, [data && data.getFeed]);

  return <FeedPresenter data={data} onFetchMore={handleFetchMore} />;
};
