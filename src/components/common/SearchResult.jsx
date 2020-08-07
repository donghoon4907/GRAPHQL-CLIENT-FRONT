import React, { useCallback, Fragment } from "react";
import { useQuery } from "react-apollo-hooks";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { TOTAL_SEARCH } from "../../query/search";
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
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
`;

const Title = styled.span`
  ${props => props.theme.tabletQuery`width:100px`}
  width: 240px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default ({ searchKeyword }) => {
  const history = useHistory();

  const { data, loading } = useQuery(TOTAL_SEARCH, {
    variables: {
      searchKeyword,
      first: 3
    },
    fetchPolicy: "no-cache"
  });

  const handleClickSearchResult = useCallback(keyword => {
    history.push(`/search?keyword=${keyword}`);
  }, []);

  if (loading) {
    return <Fragment />;
  }

  return (
    <Container>
      <ContentType>포스트 검색결과</ContentType>
      <ol>
        {data.getPosts.length > 0 ? (
          data.getPosts.map(({ id, title, user }) => (
            <Item key={id} onClick={() => handleClickSearchResult(title)}>
              <div>
                <Title>{title}</Title>
              </div>
              <div>
                <Avatar size="20" src={user.avatar.url} />
              </div>
            </Item>
          ))
        ) : (
          <Item>검색결과가 없습니다.</Item>
        )}
      </ol>
      <ContentType>유저 검색결과</ContentType>
      <ol>
        {data.getUsers.length > 0 ? (
          data.getUsers.map(({ id, nickname, avatar }) => (
            <Item key={id} onClick={() => handleClickSearchResult(nickname)}>
              <div>
                <Title>{nickname}</Title>
              </div>
              <div>
                <Avatar size="20" src={avatar.url} />
              </div>
            </Item>
          ))
        ) : (
          <Item>검색결과가 없습니다.</Item>
        )}
      </ol>
    </Container>
  );
};
