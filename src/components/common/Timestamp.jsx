import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  font-weight: 400;
  opacity: 0.5;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
`;

function Timestamp({ text }) {
  return <Container>{text}</Container>;
}
export default Timestamp;

Timestamp.propTypes = {
  text: PropTypes.string.isRequired
};
