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

export const GET_USERINFO = gql`
  {
    nickname
    url @client
  }
`;

export const LOG_IN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;

export const CONFIRM_SECRET = gql`
  mutation confirmSecret($email: String!, $secret: String!) {
    confirmSecret(email: $email, secret: $secret)
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
    getUsers(first: 5) {
      id
      nickname
      email
      avatar {
        url
      }
      isMe
      isFollowing
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
        url_240p
      }
      room {
        id
      }
      status
      isLiked
      isAccepted
      likeCount
      commentCount
      acceptCount
      isMyPost
    }
  }
`;
