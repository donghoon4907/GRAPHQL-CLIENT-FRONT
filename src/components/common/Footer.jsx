import React from "react";
import style from "styled-components";

const Footer = style.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
  margin: 50px 0px;
`;

const List = style.ul`
  display: flex;
`;

const ListItem = style.li`
  &:not(:last-child){
    margin-right: 20px;
  }
`;

const Link = style.a`
  color: ${props => props.theme.darkBlueColor};
`;

const Copyright = style.span`
  color: ${props => props.theme.darkGrayColor};
`;

export default function() {
  return (
    <Footer>
      <List>
        <ListItem>
          <Link href="#">instagram 정보</Link>
        </ListItem>
        <ListItem>
          <Link href="#">지원</Link>
        </ListItem>
        <ListItem>
          <Link href="#">홍보 센터</Link>
        </ListItem>
        <ListItem>
          <Link href="#">api</Link>
        </ListItem>
        <ListItem>
          <Link href="#">채용 정보</Link>
        </ListItem>
        <ListItem>
          <Link href="#">개인정보처리방침</Link>
        </ListItem>
        <ListItem>
          <Link href="#">약관</Link>
        </ListItem>
        <ListItem>
          <Link href="#">디렉터리</Link>
        </ListItem>
        <ListItem>
          <Link href="#">프로필</Link>
        </ListItem>
        <ListItem>
          <Link href="#">해시태그</Link>
        </ListItem>
        <ListItem>
          <Link href="#">언어</Link>
        </ListItem>
      </List>
      <Copyright>{new Date().getFullYear()} &copy;</Copyright>
    </Footer>
  );
}
