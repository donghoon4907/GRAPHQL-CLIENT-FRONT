import { gql } from "apollo-boost";

export const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

export const CHECK_TOKEN = gql`
  mutation checkToken {
    checkToken @client
  }
`;

export const CLIENT_LOGIN = gql`
  mutation logIn($token: String!) {
    logIn(token: $token) @client
  }
`;
export const LOG_IN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $email: String!
    $nickname: String!
    $firstname: String!
    $lastname: String!
  ) {
    addUser(
      email: $email
      nickname: $nickname
      firstname: $firstname
      lastname: $lastname
    ) {
      success
      message
    }
  }
`;

export const CONFIRM_SECRET = gql`
  mutation confirmSecret($email: String!, $secret: String!) {
    confirmSecret(email: $email, secret: $secret)
  }
`;
