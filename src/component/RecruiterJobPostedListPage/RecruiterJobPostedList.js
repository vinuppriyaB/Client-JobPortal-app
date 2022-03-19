import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { UserState } from "../../context/UserProvider";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import axios from "axios";
import RecruiterJobListCard from "./RecruiterJobListCard";
import "./RecruiterJobPostedList.css";

const RecruiterJobPostedList = () => {
  const { user, handleGetPost, jobPost } = UserState();
  console.log(user, jobPost);
  const history = useHistory();

  // const [postedJob, setPostedJob] = useState([]);
  useEffect(() => {
    handleGetPost(user._id);
  }, []);
  // const handleGetPost = async () => {
  //   try {
  //     let res = await axios.get(
  //       `http://localhost:5000/api/job/getrecruiterpost/${user._id}`
  //     );
  //     console.log(res);
  //     if (res) {
  //       console.log(res.data);
  //       setPostedJob(res.data);
  //       // localStorage.setItem("userInfo", JSON.stringify(res.data));

  //       // history.push("/chats");
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  return (
    <div className="Recruiter_Card_container">
      {jobPost
        ? jobPost.map((job, index) => (
            <RecruiterJobListCard
              job={job}
              key={index}
              handleGetPost={handleGetPost}
            />
          ))
        : ""}
    </div>
  );
};

export default RecruiterJobPostedList;
