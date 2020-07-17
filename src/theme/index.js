import { css } from "styled-components";

const BOX_BORDER = "1px solid #e6e6e6";
const BORDER_RADIUS = "4px";

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  small: "944px",
  middle: "1312px",
  large: "1440px",
  max: "1919px"
};

const media = Object.keys(size).reduce((a, b) => {
  a[b] = (...args) => css`
    @media (max-width: ${size[b]}) {
      ${css(...args)};
    }
  `;
  return a;
}, {});

export default {
  bgColor: "#FAFAFA",
  blackColor: "#262626",
  darkGrayColor: "#999",
  lightGrayColor: "#c7c7c7",
  redColor: "#ED4956",
  blueColor: "#3897f0",
  darkBlueColor: "#003569",
  boxBorder: "1px solid #e6e6e6",
  borderRadius: "4px",
  whiteBox: `
    border:${BOX_BORDER};
    border-radius:${BORDER_RADIUS};
    background: white;
  `,
  flexCenter: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  maxWidth: "730px",
  mobileLQuery: media.mobileL,
  tabletQuery: media.tablet,
  smallQuery: media.small,
  middleQuery: media.middle,
  largeQuery: media.large,
  maxQuery: media.max
};
