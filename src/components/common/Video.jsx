import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  position: relative;

  &:after {
    content: "";
    padding-bottom: 68%;
    display: block;
  }
`;

const Wrapper = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  &:focus {
    outline: none;
  }
`;

function Video({ src }) {
  return (
    <Container>
      <Wrapper controls>
        <source src={src} type="video/mp4" />
      </Wrapper>
    </Container>
  );
}
export default Video;

Video.propTypes = {
  src: PropTypes.string.isRequired
};
