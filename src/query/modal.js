import gql from "graphql-tag";

export const IS_SHOW_NOTICE = gql`
  {
    isShowNoticeModal @client
  }
`;
