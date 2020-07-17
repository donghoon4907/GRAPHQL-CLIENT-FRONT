import React from "react";
import style from "styled-components";
import PropTypes from "prop-types";

const Container = style.button`
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: ${(props) => props.theme.borderRadius};
    color: white;
    font-weight: 600;
    background: ${(props) => props.theme.blueColor};
    text-align: center;
    padding: 7px 0;
    font-size: 14px;
`;

function Button({ text, onClick }) {
  return <Container onClick={onClick}>{text}</Container>;
}
export default Button;

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func
};
