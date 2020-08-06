import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Timestamp from "./Timestamp";

const Contianer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  padding: 5px;

  & > span {
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    padding: 5px 0px;
    font-weight: 500;
  }
`;

function Notice({ title, updatedAt }) {
  return (
    <Contianer>
      <span>{title}</span>
      <Timestamp text={updatedAt} />
    </Contianer>
  );
}

export default Notice;

Notice.propTypes = {
  title: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired
};
