import React from "react";
import styled from "styled-components";

const Container = styled.section`
  ${props => props.theme.middleQuery`width:912px`};
  ${props => props.theme.smallQuery`width:768px`};
  ${props => props.theme.tabletQuery`width:100%`};
  width: 912px;
  height: 100%;
  display: flex;
  flex-direction: ${props => props.flexDirection};
  margin: 0 auto;
  padding: 10px;
  padding-top: 5rem;
`;

function Section({ children, flexDirection = "column" }) {
  return <Container flexDirection={flexDirection}>{children}</Container>;
}

export default Section;
