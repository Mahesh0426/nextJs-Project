import React from "react";

const UserProfile = ({ params }: any) => {
  return <div className="4xl"> this is user profile page{params.id}</div>;
};

export default UserProfile;
