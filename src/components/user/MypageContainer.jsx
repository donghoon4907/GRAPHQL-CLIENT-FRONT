import React from "react";
import { useQuery } from "react-apollo-hooks";
import MypagePresenter from "./MypagePresenter";
import { GET_MYPROFILE } from "../../query/auth";
import Loader from "../common/Loader";

export default () => {
  const { data, loading } = useQuery(GET_MYPROFILE);

  if (loading) {
    return <Loader />;
  }

  return <MypagePresenter data={data} />;
};
