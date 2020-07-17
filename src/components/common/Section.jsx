import React from "react";
import styled from "styled-components";

const Container = styled.section`
  width: 912px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 10px;
  overflow: hidden;

  ${(props) => props.theme.middleQuery`width:912px`}
  ${(props) => props.theme.smallQuery`width:100%`}
`;

function Section({ children }) {
  return <Container>{children}</Container>;
}

export default Section;
