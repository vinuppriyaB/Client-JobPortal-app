import React, { useState, useEffect } from "react";
import { UserState } from "../../context/UserProvider";
import { useHistory } from "react-router";
import RecruiterJobListCard from "./RecruiterJobListCard";
import "./RecruiterJobPostedList.css";

// component to display the previously posted job

const RecruiterJobPostedList = () => {
  const { user, handleGetPost, jobPost } = UserState();
  console.log(user);
  const history = useHistory();

  useEffect(() => {
    handleGetPost(user._id, user.token);
  }, []);

  return (
    <div className="Recruiter_Card_container">
      {jobPost.length > 0 ? (
        jobPost.map((job, index) => (
          <RecruiterJobListCard
            job={job}
            key={index}
            handleGetPost={handleGetPost}
          />
        ))
      ) : (
        <div className="NoPost_content">
          <h1>There is no post in your Account</h1>
          <p>Click Post Job Link to Post your Recruitment</p>
        </div>
      )}
    </div>
  );
};

export default RecruiterJobPostedList;
