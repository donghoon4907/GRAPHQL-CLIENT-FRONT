import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";
import { Accordion, Card, Table } from "react-bootstrap";
import Section from "../common/Section";
import PostContainer from "../post/PostContainer";

const Filter = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  height: auto;
  margin-bottom: 30px;

  & .accordion {
    width: 100%;
  }

  & .card {
    border: none;
  }

  & .card-header {
    border: none;
    cursor: pointer;
    background: ${(props) => props.theme.bgColor};
  }

  & .table thead th {
    border: none;
    border-bottom: ${(props) => props.theme.boxBorder};
  }

  & td {
    border: none;
  }
`;

const StyledTd = styled.td`
  cursor: pointer;
  font-weight: ${(props) => (props.active ? "bold" : 500)};
`;

const NoSearch = styled.div`
  width: 100%;
  text-align: center;
`;

export default ({ data: { getPosts }, orderBy, onFetchMore, onSort }) => {
  return (
    <Section>
      <Helmet>
        <title>검색결과</title>
      </Helmet>
      {getPosts.length > 0 && (
        <Filter>
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                <h1>필터</h1>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>정렬기준</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <StyledTd
                          onClick={() => onSort("createdAt_DESC")}
                          active={orderBy === "createdAt_DESC"}
                        >
                          등록일 순
                        </StyledTd>
                      </tr>
                      <tr>
                        <StyledTd
                          onClick={() => onSort("createdAt_ASC")}
                          active={orderBy === "createdAt_ASC"}
                        >
                          등록일 역순
                        </StyledTd>
                      </tr>
                      <tr>
                        <StyledTd
                          onClick={() => onSort("title_ASC")}
                          active={orderBy === "title_ASC"}
                        >
                          가나다 순
                        </StyledTd>
                      </tr>
                      <tr>
                        <StyledTd
                          onClick={() => onSort("title_DESC")}
                          active={orderBy === "title_DESC"}
                        >
                          가나다 역순
                        </StyledTd>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Filter>
      )}

      <InfiniteScroll loadMore={onFetchMore} hasMore={true}>
        {getPosts.length > 0 ? (
          getPosts.map((post) => <PostContainer key={post.id} {...post} />)
        ) : (
          <NoSearch>
            <h1>검색 결과가 없습니다.</h1>
          </NoSearch>
        )}
      </InfiniteScroll>
    </Section>
  );
};
