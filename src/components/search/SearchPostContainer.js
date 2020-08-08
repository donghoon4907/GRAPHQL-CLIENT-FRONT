import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import SearchPostPresenter from "./SearchPostPresenter";
import { SEARCH_POST } from "../../query/post";
import getParam from "../../module/param";
import Loader from "../common/Loader";

export default () => {
  const history = useHistory();
  const keyword = getParam({ name: "keyword" }) || "";
  const orderBy = getParam({ name: "orderBy" }) || "createdAt_DESC";
  const [moreLoading, setMoreLoading] = useState(false);

  const { data, loading, fetchMore } = useQuery(SEARCH_POST, {
    variables: {
      searchKeyword: decodeURIComponent(keyword),
      orderBy,
      first: 10
    },
    fetchPolicy: "cache-and-network"
  });

  const handleSort = useCallback(nextOrderBy => {
    history.push(`/search?keyword=${keyword}&orderBy=${nextOrderBy}`);
  }, []);

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

  useEffect(() => {
    window.addEventListener("scroll", handleScrollFetchMore);
    return () => window.removeEventListener("scroll", handleScrollFetchMore);
  }, [data && data.getPosts, moreLoading]);

  if (loading && !data) {
    return <Loader />;
  }

  return (
    <SearchPostPresenter
      data={data}
      loading={moreLoading}
      keyword={keyword}
      orderBy={orderBy}
      onSort={handleSort}
    />
  );
};
