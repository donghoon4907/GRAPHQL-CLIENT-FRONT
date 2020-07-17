import React from "react";
import { useQuery } from "react-apollo-hooks";
import SearchUserPresenter from "./SearchUserPresenter";
import { GET_USER } from "../../query/user";

export default ({ location: { pathname } }) => {
  const [_, __, userId] = pathname.split("/");
  const { data } = useQuery(GET_USER, {
    variables: {
      userId
    },
    suspend: true
  });

  return <SearchUserPresenter data={data} />;
};
