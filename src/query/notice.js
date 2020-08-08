import gql from "graphql-tag";

export const ADD_NOTICE = gql`
  mutation addNotice($title: String!, $description: String!) {
    addNotice(title: $title, description: $description)
  }
`;

export const UPDATE_NOTICE = gql`
  mutation updateNotice(
    $noticeId: String!
    $title: String!
    $description: String!
  ) {
    updateNotice(noticeId: $noticeId, title: $title, description: $description)
  }
`;

export const DELETE_NOTICE = gql`
  mutation deleteNotice($noticeId: String!) {
    deleteNotice(noticeId: $noticeId)
  }
`;
