import React from "react";
import { Link } from "react-router-dom";
import style from "styled-components";
import PropTypes from "prop-types";

const Container = style(Link)`
  color: black;
  
  &:hover {
    color: black;
    text-decoration: none;
  }
`;

function StyledLink({ pathname, search, hash, state, children }) {
  const to = {};
  if (pathname) {
    to["pathname"] = pathname;
  }
  if (search) {
    to["search"] = search;
  }
  if (hash) {
    to["hash"] = hash;
  }
  if (state) {
    to["state"] = state;
  }
  return <Container to={to}>{children}</Container>;
}

export default StyledLink;

StyledLink.propTypes = {
  pathname: PropTypes.string,
  search: PropTypes.string,
  hash: PropTypes.string,
  state: PropTypes.object
};
