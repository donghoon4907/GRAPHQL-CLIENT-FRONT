import React, { useCallback } from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { LOG_OUT, GET_MYPROFILE } from "../../query/auth";
import Input from "./Input";
import Avatar from "./Avatar";
import Link from "./Link";
import Loader from "./Loader";
import { useInput } from "../../hooks";
import getParam from "../../module/param";

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
  ${props => props.theme.smallQuery`width:calc(100% - 2rem)`}
`;

const Column = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled(Input)`
  background: ${props => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  height: auto;
  border-radius: 3px;
  width: 200px;
  text-align: center;

  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
  ${props => props.theme.smallQuery`width: 150px;`}
`;

const StyledAvatar = styled(Avatar)`
  & #dropdown-custom-2 {
    opacity: 0;
  }
`;

export default () => {
  const searchKeyword = getParam({ name: "keyword" });
  const history = useHistory();
  const search = useInput(
    location.pathname === "/search" ? decodeURIComponent(searchKeyword) : ""
  );

  const { data, loading } = useQuery(GET_MYPROFILE);
  const [logoutMutation] = useMutation(LOG_OUT);

  const handleSearchSubmit = useCallback(
    e => {
      e.preventDefault();
      history.push(`/search?keyword=${search.value}`);
    },
    [search.value]
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
    return <Loader />;
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
          <form onSubmit={handleSearchSubmit}>
            <SearchInput placeholder={"Search"} {...search} />
          </form>
        </Column>
        <Column>
          <Dropdown as={ButtonGroup}>
            <StyledAvatar
              size="38"
              src={
                data.getMyProfile.avatar
                  ? data.getMyProfile.avatar.url
                  : `${process.env.S3_IMAGE_PATH}${process.env.DEFAULT_AVATAR}`
              }
            >
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
