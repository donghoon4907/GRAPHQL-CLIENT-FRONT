import React from "react";
import styled from "styled-components";
import { Spinner } from "react-bootstrap";

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
`;

function Loader() {
  return (
    <Container>
      <Spinner animation="border" variant="primary" />
    </Container>
  );
}
export default Loader;
