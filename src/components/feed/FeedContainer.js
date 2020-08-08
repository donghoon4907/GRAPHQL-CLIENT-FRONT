import React, { useState, useCallback, useEffect, useRef } from "react";
import { useQuery, useApolloClient } from "react-apollo-hooks";
import FeedPresenter from "./FeedPresenter";
import { GET_MYPROFILE } from "../../query/auth";
import { SEARCH_POST } from "../../query/post";
import { IS_SHOW_NOTICE } from "../../query/modal";
import Loader from "../common/Loader";

export default () => {
  const recommandUserEl = useRef(null);
  const client = useApolloClient();
  const [moreLoading, setMoreLoading] = useState(false);
  const [notice, setNotice] = useState({
    action: "wait",
    actionText: "비활성화",
    title: "",
    description: ""
  });

  const { data, loading, fetchMore } = useQuery(SEARCH_POST, {
    variables: {
      first: 10
    },
    fetchPolicy: "cache-and-network"
  });

  const { data: profiles } = useQuery(GET_MYPROFILE);

  const {
    data: { isShowNoticeModal }
  } = useQuery(IS_SHOW_NOTICE);

  const handleScrollFetchMore = () => {
    if (moreLoading) return;
    const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
    if (data && data.getPosts) {
      if (scrollTop + clientHeight === scrollHeight) {
        if (data.getPosts.length % 10 === 0) {
          setMoreLoading(true);

          fetchMore({
            variables: {
              skip: data.getPosts.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;

              if (fetchMoreResult.getPosts.length === 0) {
                window.removeEventListener("scroll", handleScrollFetchMore);
              }

              setMoreLoading(false);

              return Object.assign({}, prev, {
                getPosts: [...prev.getPosts, ...fetchMoreResult.getPosts]
              });
            }
          });
        }
      }
    }
  };

  const handleAddNotice = useCallback(() => {
    setNotice({
      action: "add",
      actionText: "등록",
      title: "",
      description: ""
    });
    client.writeData({
      data: {
        isShowNoticeModal: true
      }
    });
  }, []);

  const handleShowNotice = useCallback(
    (title, description, noticeId) => {
      setNotice({
        action: profiles.getMyProfile.isMaster ? "modifiable" : "readonly",
        actionText: "",
        title,
        description,
        noticeId
      });
      client.writeData({
        data: {
          isShowNoticeModal: true
        }
      });
    },
    [profiles]
  );

  useEffect(() => {
    if (!isShowNoticeModal) {
      setNotice({
        action: "wait",
        actionText: "비활성화",
        title: "",
        description: ""
      });
    }
  }, [isShowNoticeModal]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollFetchMore);
    return () => window.removeEventListener("scroll", handleScrollFetchMore);
  }, [data && data.getPosts, moreLoading]);

  if ((loading && !data) || !profiles) {
    return <Loader />;
  }

  return (
    <FeedPresenter
      data={data}
      loading={moreLoading}
      profile={profiles.getMyProfile}
      notice={notice}
      notices={profiles.getNotices}
      isShowNoticeModal={isShowNoticeModal}
      onShowNotice={handleShowNotice}
      onAddNotice={handleAddNotice}
      recommandUserEl={recommandUserEl}
    />
  );
};
