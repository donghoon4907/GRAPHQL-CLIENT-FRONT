import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import SearchPostPresenter from "./SearchPostPresenter";
import { SEARCH_POST } from "../../query/post";
import getParam from "../../module/param";

export default () => {
  const history = useHistory();
  const keyword = getParam({ name: "keyword" }) || "";
  const orderBy = getParam({ name: "orderBy" }) || "createdAt_DESC";

  const { data, fetchMore } = useQuery(SEARCH_POST, {
    variables: {
      searchKeyword: decodeURIComponent(keyword),
      orderBy
    },
    suspend: true
  });

  const handleSort = useCallback((nextOrderBy) => {
    history.push(`/search?keyword=${keyword}&orderBy=${nextOrderBy}`);
  }, []);

  const handleFetchMore = useCallback(() => {
    if (data && data.getPosts) {
      fetchMore({
        variables: {
          skip: data.getPosts.length,
          searchKeyword: keyword
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

  return (
    <SearchPostPresenter
      data={data}
      orderBy={orderBy}
      onFetchMore={handleFetchMore}
      onSort={handleSort}
    />
  );
};
