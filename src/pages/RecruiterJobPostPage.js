import React from "react";
import PostJob from "../component/PostJob/PostJob";
import RecruiterJobPostedList from "../component/RecruiterJobPostedListPage/RecruiterJobPostedList";
import RecruiterHeader from "../component/recruiterPage/RecruiterHeader";

const RecruiterJobPostPage = () => {
  return (
    <div>
      <RecruiterHeader />
      <PostJob />
    </div>
  );
};

export default RecruiterJobPostPage;
