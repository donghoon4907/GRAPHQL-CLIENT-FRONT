import React, { useCallback, Fragment } from "react";
import { useQuery } from "react-apollo-hooks";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { GET_SEARCHKEYWORD } from "../../query/searchkeyword";
import Avatar from "./Avatar";
import Button from "./Button";

const Container = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 37px;
  left: 0;
  height: auto;
`;

const ContentType = styled.div`
  background: rgba(0, 0, 0, 0.03);
  font-size: 14px;
  padding: 5px;
  border-bottom: ${props => props.theme.boxBorder};
`;

const Item = styled.li`
  display: flex;
  justify-content: flex-start
  align-items: center;
  padding: 5px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
`;

const Title = styled.h3`
  ${props => props.theme.tabletQuery`width:100px`}
  width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default ({ searchKeyword, setSearch, setSearchKeyword }) => {
  const history = useHistory();

  const { data, loading } = useQuery(GET_SEARCHKEYWORD, {
    variables: {
      searchKeyword
    },
    fetchPolicy: "no-cache"
  });

  const handleClickItem = useCallback(keyword => {
    history.push(`/search?keyword=${keyword}`);
    setSearch(keyword);
    setSearchKeyword("");
  }, []);

  if (loading) {
    return <Fragment />;
  }

  return (
    <Container>
      <ContentType>연관 검색어</ContentType>
      <ol>
        {data.getSearchKeyword.length > 0 ? (
          data.getSearchKeyword.map(({ id, keyword }) => (
            <Item key={id} onClick={() => handleClickItem(keyword)}>
              <Title>{keyword}</Title>
            </Item>
          ))
        ) : (
          <Item>검색결과가 없습니다.</Item>
        )}
      </ol>
    </Container>
  );
};
