import React from "react";
import styled from "styled-components";

const Container = styled.section`
  width: 912px;
  height: 100%;
  display: flex;
  flex-direction: ${props => props.flexDirection};
  margin: 0 auto;
  padding: 10px;
  padding-top: 5rem;

  ${props => props.theme.middleQuery`width:912px`}
  ${props => props.theme.smallQuery`width:100%`}
`;

function Section({ children, flexDirection = "column" }) {
  return <Container flexDirection={flexDirection}>{children}</Container>;
}

export default Section;
