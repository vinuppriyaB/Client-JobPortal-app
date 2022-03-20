import React, { useState, useEffect } from "react";
import { UserState } from "../../context/UserProvider";
import { useHistory } from "react-router";
import axios from "axios";
import CandidateJobCard from "./CandidateJobCard";
import "./CandidateJobList.css";

// component to Fetch the available job for candidate
const CandidateJobList = () => {
  const { user, handleGetPost, jobPost } = UserState();
  const history = useHistory();

  const [postedJob, setPostedJob] = useState([]);
  useEffect(() => {
    handleGetallPost();
  }, []);

  // Get available Job offer forr candidate
  const handleGetallPost = async () => {
    const headerData = {
      headers: {
        token: user.token,
      },
    };
    try {
      let res = await axios.get(
        "http://localhost:5000/api/job/getalljob",
        headerData
      );

      if (res) {
        setPostedJob(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="CanCard_Container">
      {postedJob
        ? postedJob.map((job, index) => (
            <CandidateJobCard job={job} key={job._id} />
          ))
        : ""}
    </div>
  );
};

export default CandidateJobList;
