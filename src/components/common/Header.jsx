import React from "react";
import style from "styled-components";
import Helmat from "react-helmet";
import { Link } from "react-router-dom";
import Input from "./Input";
import { useInput } from "../../hooks";
// import { Compass, HeartEmpty, User, Logo } from "./icons";

const Header = style.header`
    width: 100%;
    border:0;
    border-bottom: ${(props) => props.theme.boxBorder};
    border-radius: 0;
    // margin-bottom: 60px;
    display:flex;
    justify-content: center;
    align-items: center;
    padding: 25px 0px;
    background: white;
    z-index: 2; 
`;

const HeaderWrapper = style.div`
    width: 100%;
    max-width: ${(props) => props.theme.maxWidth};
    display: flex;
    justify-content: center;
`;

const SearchInput = style(Input)`
    background: ${(props) => props.theme.bgColor};
    padding: 5px;
    font-size: 14px;
    height: auto;
    border-radius: 3px;
    text-align: center;
    width: 70%;
    &::placeholder {
        opacity: 0.8;
        font-weight: 200;
    }
`;
const HeaderColumn = style.div`
width: 33%;
text-align: center;
&:first-child {
    margin-right: auto;
    text-align:left;
}
&:last-child {
    margin-left: auto;
    text-align:right;
}
`;
const HeaderLink = style(Link)`
    &:not(:last-child){
        margin-right: 30px;
    }
`;

export default () => {
  // const search = useInput("");
  // const onSearchSubmit = (e) => {
  //   e.preventDefault();
  //   history.push(`/search?term=${search.value}`);
  // };
  return (
    <Header>
      <Helmat>
        <title>Feed | Insta</title>
      </Helmat>
      <HeaderWrapper>
        <HeaderColumn>{/* <Link to={"/"}><Logo /></Link> */}</HeaderColumn>
        <HeaderColumn>
          {/* <form onSubmit={onSearchSubmit}>
            <SearchInput
              value={search.value}
              onChange={search.onChange}
              placeholder={"Search"}
            />
          </form> */}
        </HeaderColumn>
        <HeaderColumn>
          {/* <HeaderLink to="/explore"><Compass /></HeaderLink> */}
          {/* <HeaderLink to="/notification"><HeartEmpty /></HeaderLink> */}
          {/* <HeaderLink to="/profile"><User /></HeaderLink> */}
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
};
