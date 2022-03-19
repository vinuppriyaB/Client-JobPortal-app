import React from "react";
import CandidateJobList from "../component/CandidateJobList/CandidateJobList";
import CandidateHeader from "../component/candidatePage/CandidateHeader";

const CandidatePage = () => {
  return (
    <div>
      <CandidateHeader />
      <CandidateJobList />
    </div>
  );
};

export default CandidatePage;
