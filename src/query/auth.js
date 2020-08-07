import gql from "graphql-tag";

export const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

export const LOG_OUT = gql`
  mutation logOut {
    logOut @client
  }
`;

export const CLIENT_LOGIN = gql`
  mutation logIn($token: String!) {
    logIn(token: $token) @client
  }
`;

export const LOG_IN = gql`
  mutation logIn($email: String!, $pwd: String!) {
    logIn(email: $email, pwd: $pwd)
  }
`;

export const GET_MYPROFILE = gql`
  {
    getMyProfile {
      id
      nickname
      email
      avatar {
        url
      }
      isMe
      isMaster
      posts {
        id
      }
      followedBy {
        id
      }
      following {
        id
      }
    }
    getNotices(first: 5) {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
`;

export const GET_FEED = gql`
  query getFeed($skip: Int, $first: Int, $orderBy: String) {
    getFeed(skip: $skip, first: $first, orderBy: $orderBy) {
      id
      title
      description
      createdAt
      updatedAt
      user {
        id
        nickname
        isFollowing
        avatar {
          url
        }
      }
      video {
        url
      }
      room {
        id
      }
      status
      isLiked
      likeCount
      isMyPost
    }
  }
`;
