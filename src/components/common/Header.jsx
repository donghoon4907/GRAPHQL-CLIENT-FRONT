import React, { useState, useCallback, Fragment } from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { LOG_OUT, GET_MYPROFILE } from "../../query/auth";
import Input from "./Input";
import Avatar from "./Avatar";
import Link from "./Link";
import getParam from "../../module/param";
import { Label } from "../auth/StyledComponents";
import SearchResult from "./SearchResult";
import { useDebounce } from "../../hooks";

const Container = styled.header`
  height: 4rem;
  width: 100%;
  background: white;
  position: fixed;
  border-bottom: ${props => props.theme.boxBorder};
  z-index: 1;
`;

const Wrapper = styled.div`
  width: 912px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  ${props => props.theme.middleQuery`width:912px`}
  ${props => props.theme.smallQuery`width:768px`}
  ${props => props.theme.tabletQuery`width:calc(100% - 2rem)`}
`;

const Column = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchForm = styled.form`
  width: 300px;
  position: relative;
  ${props => props.theme.tabletQuery`width:150px`}
`;

const SearchInput = styled(Input)`
  background: ${props => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  text-align: center;

  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;

const StyledAvatar = styled(Avatar)`
  & #dropdown-custom-2 {
    opacity: 0;
  }
`;

export default () => {
  const keyword = getParam({ name: "keyword" });
  const history = useHistory();
  const [search, setSearch] = useState(
    location.pathname === "/search" ? decodeURIComponent(keyword) : ""
  );
  const [searchKeyword, setSearchKeyword] = useDebounce("", 1000);

  const { data, loading } = useQuery(GET_MYPROFILE);

  const [logoutMutation] = useMutation(LOG_OUT);

  const handleChangeSearch = useCallback(e => {
    setSearch(e.target.value);
    setSearchKeyword(e.target.value);
  }, []);

  const handleSearchSubmit = useCallback(
    e => {
      e.preventDefault();
      history.push(`/search?keyword=${search}`);
    },
    [search]
  );

  const handleMypage = useCallback(() => {
    history.push("/mypage");
  }, []);

  const handleAddPost = useCallback(() => {
    history.push("/post/new");
  }, []);

  const handleLogout = useCallback(() => {
    if (confirm("로그아웃 하시겠습니까?")) {
      logoutMutation();
    }
  }, []);

  if (loading) {
    return <Fragment />;
  }

  return (
    <Container>
      <Wrapper>
        <Column>
          <Link pathname="/">
            <h1>GRAPHQL CLIENT</h1>
          </Link>
        </Column>
        <Column>
          <SearchForm onSubmit={handleSearchSubmit}>
            <Label htmlFor="search" val={search}>
              검색어를 입력하세요.
            </Label>
            <SearchInput
              placeholder="검색어를 입력하세요."
              name="search"
              value={search}
              onChange={handleChangeSearch}
            />
            {searchKeyword && <SearchResult searchKeyword={searchKeyword} />}
          </SearchForm>
        </Column>
        <Column>
          <Dropdown as={ButtonGroup}>
            <StyledAvatar size="38" src={data.getMyProfile.avatar.url}>
              <Dropdown.Toggle id="dropdown-custom-2" />
            </StyledAvatar>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="1" onClick={handleMypage}>
                내 정보
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="2" onClick={handleAddPost}>
                포스트 등록
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="3" onClick={handleLogout}>
                로그아웃
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Column>
      </Wrapper>
    </Container>
  );
};
