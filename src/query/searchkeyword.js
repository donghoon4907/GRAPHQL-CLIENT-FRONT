import gql from "graphql-tag";

export const GET_SEARCHKEYWORD = gql`
  query getSearchKeyword(
    $skip: Int
    $first: Int
    $orderBy: String
    $searchKeyword: String!
  ) {
    getSearchKeyword(
      skip: $skip
      first: $first
      orderBy: $orderBy
      searchKeyword: $searchKeyword
    ) {
      id
      keyword
    }
  }
`;
