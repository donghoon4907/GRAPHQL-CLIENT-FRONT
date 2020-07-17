import React from "react";
import style from "styled-components";
import PropTypes from "prop-types";

const Container = style.input`
  border: 0;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background: ${(props) => props.theme.bgColor};
  width: 100%;
  height: 35px;
  padding: 0px 15px;
  font-size: 12px;
  
  &:focus {
    outline: none;
  }
`;

function Input({
  placeholder,
  required = true,
  value,
  onChange,
  type = "text"
}) {
  return (
    <Container
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      type={type}
    />
  );
}

export default Input;

Input.propTypes = {
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string
};
