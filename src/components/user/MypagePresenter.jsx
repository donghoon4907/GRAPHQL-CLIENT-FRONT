import React from "react";
import Section from "../common/Section";
import ProfileUserContainer from "../user/ProfileUserContainer";

export default ({ data: { getMyProfile } }) => {
  return (
    <Section>
      <ProfileUserContainer {...getMyProfile} />
    </Section>
  );
};
