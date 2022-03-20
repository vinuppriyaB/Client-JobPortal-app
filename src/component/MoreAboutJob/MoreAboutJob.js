import React, { useState, useEffect } from "react";
import "./MoreAboutJob.css";
import { useParams } from "react-router";
import { UserState } from "../../context/UserProvider";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import Card from "@mui/material/Card";

// To display More Details about Recruitment to Candidate
const MoreAboutJob = () => {
  const { user, handleGetPost, jobPost } = UserState();
  const history = useHistory();
  const { id1, id2 } = useParams();
  const [recruiter, setRecruiter] = useState("");
  const [job, setJob] = useState("");
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    handleGetRecruiter();
    handleGetJob();
  }, []);

  //   function to get  Recruiter  details
  const handleGetRecruiter = async () => {
    const headerData = {
      headers: {
        token: user.token,
      },
    };
    try {
      let res = await axios.get(
        `https://career-growth-platforrm.herokuapp.com/api/recruiter/getrecruiterdetail/${id1}`,

        headerData
      );
      if (res) {
        setRecruiter(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //   function to get  Job  details
  const handleGetJob = async () => {
    const headerData = {
      headers: {
        token: user.token,
      },
    };
    try {
      let res = await axios.get(
        `https://career-growth-platforrm.herokuapp.com/api/job/getjob/${id2}`,

        headerData
      );
      if (res) {
        setJob(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //   function to apply for Job
  const handleApply = async () => {
    const headerData = {
      headers: {
        token: user.token,
      },
    };
    try {
      let res = await axios.post(
        `https://career-growth-platforrm.herokuapp.com/api/job/apply/${job._id}/${user._id}`,
        {},
        headerData
      );
      if (res) {
        setApplied(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="AboutJob_container">
      {job ? (
        <Card
          sx={{ margin: "50px", padding: "10px 50px" }}
          className="recruiter_card"
        >
          <div className="AboutJob_Company">
            <img
              src={job.logo}
              alt={job.companyName}
              className="Company_logo"
            />
            <h3>{job.companyName}</h3>
          </div>

          <div className="AboutJob_Recruiter">
            <div className="recruiter_Name">
              <div>
                <Avatar
                  className="recruiter_Avatar"
                  alt={recruiter.firstName}
                  src={recruiter.pic}
                />
              </div>
              <div>
                <h3>{`${recruiter.firstName} ${recruiter.lastName}`}</h3>
                <p>{`${recruiter.designation} at ${recruiter.workAt}.`}</p>
              </div>
            </div>
          </div>

          <div>
            <h4>Recruitement Process Details</h4>
            <p>Role : {job.role}</p>
            <p>Location : {job.place}</p>
            <p>Job Type : {job.jobType}</p>
            <p>Openings : {job.opening}</p>
            <p>CTC : {job.CTC}</p>
            <p>No of Rounds : {job.roundCount}</p>
            <p>
              {job.Rounds.map((r, index) => (
                <span key={index}>Rounds : {r}</span>
              ))}
            </p>
          </div>

          <div className="apply_btns">
            <Button variant="contained" onClick={() => history.goBack()}>
              back
            </Button>
            {job.appliedby.includes(user._id) || applied ? (
              <Button variant="contained" disabled>
                Applied
              </Button>
            ) : (
              <Button
                variant="contained"
                className="button_color"
                onClick={(e) => handleApply(e)}
              >
                Apply
              </Button>
            )}
          </div>
        </Card>
      ) : (
        ""
      )}
    </div>
  );
};

export default MoreAboutJob;
// <div>
//             <h4>Role : {job.role}</h4>
//             <p>Location : {job.place}</p>
//             <p>Job Type : {job.jobType}</p>
//             <p>Openings : {job.opening}</p>
//             <p>CTC : {job.CTC}</p>
//             <p>No of Rounds : {job.roundCount}</p>
//             <p>
//               {job.Rounds.map((r, index) => (
//                 <span key={index}>Rounds : {r}</span>
//               ))}
//             </p>
