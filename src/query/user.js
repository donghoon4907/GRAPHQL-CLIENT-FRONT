import gql from "graphql-tag";

export const SEARCH_USER = gql`
  query getUsers($skip: Int, $first: Int, $orderBy: String, $nickname: String) {
    getUsers(
      skip: $skip
      first: $first
      orderBy: $orderBy
      nickname: $nickname
    ) {
      id
      nickname
      email
      avatar {
        url
      }
      posts {
        id
      }
      followedBy {
        nickname
        avatar {
          url
        }
      }
      isFollowing
      isMe
    }
  }
`;

export const GET_USER = gql`
  query getUser($userId: String!) {
    getUser(userId: $userId) {
      id
      nickname
      email
      avatar {
        url
      }
      posts {
        id
      }
      following {
        nickname
        avatar {
          url
        }
      }
      followedBy {
        nickname
        avatar {
          url
        }
      }
      isMe
      isFollowing
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $email: String!
    $nickname: String!
    $firstname: String!
    $lastname: String!
    $file: String
  ) {
    addUser(
      email: $email
      nickname: $nickname
      firstname: $firstname
      lastname: $lastname
      file: $file
    )
  }
`;

export const FOLLOW = gql`
  mutation follow($userId: String!) {
    follow(userId: $userId)
  }
`;

export const UNFOLLOW = gql`
  mutation unfollow($userId: String!) {
    unfollow(userId: $userId)
  }
`;

export const GET_MESSAGEROOM = gql`
  query getMessageRoom($roomId: String!) {
    getMessageRoom(roomId: $roomId) {
      id
      participants {
        id
        nickname
        email
        avatar {
          url
        }
      }
      messages {
        id
        content
        createdAt
        updatedAt
        from {
          id
          nickname
          avatar {
            url
          }
        }
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($content: String!, $roomId: String, $to: String) {
    addMessage(content: $content, roomId: $roomId, to: $to)
  }
`;

export const SYNC_MESSAGE = gql`
  subscription syncMessage($roomId: String!) {
    syncMessage(roomId: $roomId) {
      id
      content
      createdAt
      updatedAt
      from {
        id
        nickname
        email
        avatar {
          url
        }
      }
    }
  }
`;
