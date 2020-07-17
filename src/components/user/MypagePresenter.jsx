import React from "react";
import Section from "../common/Section";
import UserComponent from "../user/UserContainer";

export default ({ data: { getMyProfile } }) => {
  return (
    <Section>
      <UserComponent {...getMyProfile} />
    </Section>
  );
};
