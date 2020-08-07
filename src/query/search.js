import gql from "graphql-tag";

export const TOTAL_SEARCH = gql`
  query totalSearch($first: Int, $orderBy: String, $searchKeyword: String) {
    getPosts(first: $first, orderBy: $orderBy, searchKeyword: $searchKeyword) {
      id
      title
      description
      user {
        id
        nickname
        avatar {
          url
        }
      }
      isMyPost
    }
    getUsers(first: $first, orderBy: $orderBy, nickname: $searchKeyword) {
      id
      nickname
      avatar {
        url
      }
      isMe
    }
  }
`;
