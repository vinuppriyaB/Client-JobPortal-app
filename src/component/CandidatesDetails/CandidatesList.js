import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { UserState } from "../../context/UserProvider";
import { useHistory } from "react-router";
import axios from "axios";
import CandidatesDetails from "./CandidatesDetails";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./CandidatesList.css";

// component to get the Applied Candidate on recruiter side
const CandidatesList = () => {
  const { id } = useParams();
  const { user, handleGetPost, jobPost } = UserState();
  const history = useHistory();

  const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    handleGetCandidateDetails();
  }, []);

  // Applied candidate of respective job post
  const handleGetCandidateDetails = async () => {
    const headerData = {
      headers: {
        token: user.token,
      },
    };
    try {
      let res = await axios.get(
        `https://career-growth-platforrm.herokuapp.com/api/candidate/getCandidates/${id}`,
        headerData
      );
      if (res) {
        setCandidates(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="CanListCard_Container">
      <h2> Total Candidates Applied :{candidates.length}</h2>
      {candidates.map((candidate, index) => (
        <CandidatesDetails candidate={candidate} key={index} />
      ))}
      <Button
        className="back_btn CanBack_btn"
        variant="text"
        onClick={(e) => history.goBack()}
      >
        <ArrowBackIcon /> Back
      </Button>
    </div>
  );
};

export default CandidatesList;
