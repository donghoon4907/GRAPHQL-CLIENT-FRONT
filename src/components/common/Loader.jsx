import React from "react";
import styled from "styled-components";
import { Spinner } from "react-bootstrap";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  z-index: 5;
`;

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

function Loader() {
  return (
    <Container>
      <Wrapper>
        <Spinner animation="border" variant="primary" />
      </Wrapper>
    </Container>
  );
}
export default Loader;
