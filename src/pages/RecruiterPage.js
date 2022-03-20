import React from "react";
import RecruiterJobPostedList from "../component/RecruiterJobPostedListPage/RecruiterJobPostedList";
import RecruiterHeader from "../component/recruiterPage/RecruiterHeader";

import { UserState } from "../context/UserProvider";

const RecruiterPage = () => {
  const { user, handleGetPost, jobPost } = UserState();
  return (
    <div>
      <RecruiterHeader />
      <RecruiterJobPostedList />
    </div>
  );
};

export default RecruiterPage;
