import React from "react";
import styled from "styled-components";
import { Spinner } from "react-bootstrap";

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  z-index: 10000;
  background: rgba(255, 255, 255, 0.5);
`;

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
`;

function Loading() {
  return (
    <Container>
      <Wrapper>
        <Spinner animation="border" variant="primary" />
      </Wrapper>
    </Container>
  );
}
export default Loading;
