import React, { useState, useEffect } from "react";
import { UserState } from "../../context/UserProvider";
import { useHistory } from "react-router";
import axios from "axios";
import CandidateJobCard from "./CandidateJobCard";
import "./CandidateJobList.css";
const CandidateJobList = () => {
  const { user, handleGetPost, jobPost } = UserState();
  console.log(user);
  const history = useHistory();

  const [postedJob, setPostedJob] = useState([]);
  useEffect(() => {
    handleGetallPost();
  }, []);
  const handleGetallPost = async () => {
    try {
      let res = await axios.get("http://localhost:5000/api/job/getalljob");
      console.log(res);
      if (res) {
        console.log(res.data);
        setPostedJob(res.data);
        // localStorage.setItem("userInfo", JSON.stringify(res.data));

        // history.push("/chats");
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
