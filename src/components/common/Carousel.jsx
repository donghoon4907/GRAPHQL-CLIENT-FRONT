import React from "react";
import styled from "styled-components";
import { Carousel } from "react-bootstrap";
import { Next } from "../icon";

const Container = styled(Carousel)`
  width: 100%;
  height: 100%;

  & .carousel-control-next,
  .carousel-control-prev {
    width: 5%;
  }

  & .carousel-inner,
  .carousel-item {
    width: 100%;
    height: 100%;
  }
`;

export const CarouselColumn = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 0 50px;
  box-sizing: border-box;
  overflow: hidden;
`;

export const CarouselItem = styled.div`
  flex: 1
  padding: 10px;

  & + & {
    margin-left: 10px;
  }
`;

export default ({ children }) => (
  <Container
    indicators={false}
    nextIcon={<Next />}
    prevIcon={<Next style={{ transform: "rotate(180deg)" }} />}
  >
    {children}
  </Container>
);
