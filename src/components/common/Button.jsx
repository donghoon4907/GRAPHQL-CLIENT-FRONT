import React from "react";
import style from "styled-components";
import PropTypes from "prop-types";

const Container = style.button`
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: ${props => props.theme.borderRadius};
    color: white;
    font-weight: 600;
    background: ${props => props.theme.blueColor};
    text-align: center;
    padding: 7px;
    font-size: 14px;
    border: 1px solid ${props => props.theme.blueColor};

    &:hover {
      background: white;
      color: black;
      border: 1px solid black;
    }
`;

function Button({ text, className, onClick }) {
  return (
    <Container className={className} onClick={onClick}>
      {text}
    </Container>
  );
}
export default Button;

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func
};
