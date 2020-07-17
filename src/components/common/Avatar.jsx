import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  position: relative;

  & img {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  & #dropdown-custom-2 {
    opacity: 0;
  }
`;

function Avatar({ size, src, onClick, children }) {
  return (
    <Container onClick={onClick} size={size}>
      <img src={src} alt="avatar" />
      {children}
    </Container>
  );
}

export default Avatar;

Avatar.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func
};
