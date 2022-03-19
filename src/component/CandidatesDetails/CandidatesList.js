import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { UserState } from "../../context/UserProvider";
import { useHistory } from "react-router";
import axios from "axios";
import CandidatesDetails from "./CandidatesDetails";
const CandidatesList = () => {
  const { id } = useParams();
  const { user, handleGetPost, jobPost } = UserState();
  console.log(user);
  const history = useHistory();

  const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    handleGetCandidateDetails();
  }, []);
  const handleGetCandidateDetails = async () => {
    try {
      let res = await axios.get(
        `http://localhost:5000/api/candidate/getCandidates/${id}`
      );
      console.log(res);
      if (res) {
        console.log(res.data);
        setCandidates(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {candidates.map((candidate, index) => (
        <CandidatesDetails candidate={candidate} key={index} />
      ))}
    </div>
  );
};

export default CandidatesList;
