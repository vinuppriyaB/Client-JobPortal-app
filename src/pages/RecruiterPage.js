import React from "react";
import RecruiterJobPostedList from "../component/RecruiterJobPostedListPage/RecruiterJobPostedList";
import RecruiterHeader from "../component/recruiterPage/RecruiterHeader";

const RecruiterPage = () => {
  return (
    <div>
      <RecruiterHeader />
      <RecruiterJobPostedList />
    </div>
  );
};

export default RecruiterPage;
