import { css } from "styled-components";

const BOX_BORDER = "1px solid #e6e6e6";
const BORDER_RADIUS = "4px";

const SIZES = {
  DESKTOP: 1024,
  TABLET: 768
};

const media = Object.keys(SIZES).reduce((a, b) => {
  a[b] = (...args) => css`
    @media (max-width: ${SIZES[b] / 16}em) {
      ${css(...args)};
    }
  `;
  return a;
}, {});

export default {
  // menuFontColor: "#3EA9F1", // 메뉴 액티브 배경색
  // menuBgColor: "#292f38", // 메뉴 배경색
  // contentBgColor: "#323A45", // 내용 배경색
  // borderColor: "#DEE2E6", // 입력창 테두리색
  // cardBorderColor: "#78859E", // 카드형 테두리색
  // cardBgColor: "#222222", // 카드형 배경색
  // asideMenuWidth: 50, // 메뉴바 너비
  // betweenCardMargin: 30, // 카드 사이 공간 너비
  bgColor: "#FAFAFA", // 테마 배경색
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
  maxWidth: "730px",
  desktopQuery: media.DESKTOP,
  tabletQuery: media.TABLET
};
