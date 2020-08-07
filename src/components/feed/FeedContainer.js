import React, { useCallback, useRef } from "react";
import { useQuery, useApolloClient } from "react-apollo-hooks";
import FeedPresenter from "./FeedPresenter";
import { GET_MYPROFILE } from "../../query/auth";
import { SEARCH_POST } from "../../query/post";
import Loader from "../common/Loader";

export default () => {
  const recommandUserEl = useRef(null);
  const client = useApolloClient();
  const { data, loading, fetchMore } = useQuery(SEARCH_POST, {
    variables: {
      first: 10
    },
    fetchPolicy: "no-cache"
  });

  const { data: profiles } = useQuery(GET_MYPROFILE);

  const handleFetchMore = useCallback(() => {
    if (data && data.getPosts) {
      fetchMore({
        variables: {
          skip: data.getPosts.length
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            getPosts: [...prev.getPosts, ...fetchMoreResult.getPosts]
          });
        }
      });
    }
  }, [data && data.getPosts]);

  const handleShowNoticeModal = useCallback(() => {
    client.writeData({
      data: {
        isShowNoticeModal: true
      }
    });
  }, []);

  if ((loading && !data) || !profiles) {
    return <Loader />;
  }

  return (
    <FeedPresenter
      data={data}
      profile={profiles.getMyProfile}
      notices={profiles.getNotices}
      onShowNoticeModal={handleShowNoticeModal}
      onFetchMore={handleFetchMore}
      recommandUserEl={recommandUserEl}
    />
  );
};
