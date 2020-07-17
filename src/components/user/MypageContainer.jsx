import React from "react";
import { useQuery } from "react-apollo-hooks";
import MypagePresenter from "./MypagePresenter";
import { GET_MYPROFILE } from "../../query/auth";

export default () => {
  const { data } = useQuery(GET_MYPROFILE, { suspend: true });

  return <MypagePresenter data={data} />;
};
