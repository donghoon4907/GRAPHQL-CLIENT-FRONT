import gql from "graphql-tag";

export const SEARCH_POST = gql`
  query getPosts(
    $skip: Int
    $first: Int
    $orderBy: String
    $searchKeyword: String
  ) {
    getPosts(
      skip: $skip
      first: $first
      orderBy: $orderBy
      searchKeyword: $searchKeyword
    ) {
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
        url_320p
        url_480p
        url_720p
        url_1080p
      }
      status
      isLiked
      likeCount
      isMyPost
      room {
        id
      }
    }
  }
`;

export const GET_POST = gql`
  query getPost($postId: String!) {
    getPost(postId: $postId) {
      id
      title
      description
      video {
        url
        url_240p
      }
      status
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postId: String!) {
    likePost(postId: $postId)
  }
`;

export const ADD_POST = gql`
  mutation addPost(
    $title: String!
    $description: String
    $status: String!
    $file: String!
  ) {
    addPost(
      title: $title
      description: $description
      status: $status
      file: $file
    )
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost(
    $postId: String!
    $title: String!
    $description: String
    $status: String!
  ) {
    updatePost(
      postId: $postId
      title: $title
      description: $description
      status: $status
    )
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: String!) {
    deletePost(postId: $postId)
  }
`;
