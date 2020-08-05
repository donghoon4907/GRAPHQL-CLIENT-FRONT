import React from "react";
import { useQuery } from "react-apollo-hooks";
import SearchUserPresenter from "./SearchUserPresenter";
import { GET_USER } from "../../query/user";
import Loader from "../common/Loader";

export default ({ location: { pathname } }) => {
  const [_, __, userId] = pathname.split("/");
  const { data, loading } = useQuery(GET_USER, {
    variables: {
      userId
    },
    fetchPolicy: "no-cache"
  });

  if (loading) {
    return <Loader />;
  }

  return <SearchUserPresenter data={data} />;
};
