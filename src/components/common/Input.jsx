import React, { forwardRef } from "react";
import style from "styled-components";

const Container = style.input`
  border: 0;
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};
  background: ${props => props.theme.bgColor};
  width: 100%;
  height: 35px;
  padding: 0px 15px;
  font-size: 12px;
  
  &:focus {
    outline: none;
  }
`;

export default forwardRef(
  (
    {
      placeholder,
      required = true,
      value,
      onChange,
      type = "text",
      name,
      autoComplete = "off"
    },
    ref
  ) => (
    <Container
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      type={type}
      ref={ref}
      name={name}
      autoComplete={autoComplete}
    />
  )
);
