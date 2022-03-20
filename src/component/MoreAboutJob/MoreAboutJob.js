import React, { useState, useEffect } from "react";
import "./MoreAboutJob.css";
import { useParams } from "react-router";
import { UserState } from "../../context/UserProvider";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import Card from "@mui/material/Card";

import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";

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
          className="AboutJob_card"
        >
          <div>
            <h3 className="Card_heading">{job.role}</h3>
          </div>
          <div className="AboutJob_Company">
            <img
              src={job.logo}
              alt={job.companyName}
              className="Company_logo"
            />
            <h4 className="Card_titles">{job.companyName}</h4>
          </div>

          <div>
            <h4 className="Card_titles">Job Description</h4>
            <p>
              <span className="side_title">Job Title :</span> {job.role}
            </p>
            <p>
              <span className="side_title">Location : </span>
              {job.place}
            </p>
            <p>
              <span className="side_title">Experience Range :</span>
              {`${job.ExpFrom} - ${job.ExpTo} years`}
            </p>
          </div>
          <div className="AboutJob_Recruiter">
            <h4 className="Card_titles">Recruitement Posted By</h4>
            <div className="recruiter_Name">
              <div className="recruiter_Avatar_wrapper">
                <Avatar
                  className="recruiter_Avatar"
                  alt={recruiter.firstName}
                  src={recruiter.pic}
                />
              </div>
              <div>
                <p className="Recruiter_name">{`${recruiter.firstName} ${recruiter.lastName}`}</p>
                <p className="Recruiter_name">{`${recruiter.designation} at ${recruiter.workAt}.`}</p>
              </div>
            </div>
          </div>
          <div>
            <p className="Job_Describtion">{job.desc}</p>
          </div>
          <div>
            <h4 className="Card_titles">Recruitement Process Details</h4>

            <p>
              <span className="side_title">Job Type : </span>
              {job.jobType}
            </p>
            <p>
              <span className="side_title">Openings : </span>
              {job.opening}
            </p>
            <p>
              <span className="side_title">CTC : </span>
              {job.CTC}
            </p>
            <p>
              <span className="side_title">No of Rounds : </span>
              {job.roundCount}
            </p>
            <p>
              <span className="side_title">Rounds : </span>
              {job.Rounds.map((r, index) => (
                <span key={index}>{r} ,</span>
              ))}
            </p>
            <p>
              Interested candidates can send your resume to{" "}
              <span className="Recruiter_Email">{user.email}</span>
            </p>
          </div>

          <div>
            <h4 className="Card_titles">Skills</h4>
            <div>
              <h5>Must Have</h5>
              <p>
                {job.mustHave.map((r, index) => (
                  <span key={index}> {r},</span>
                ))}
              </p>
            </div>
            <div>
              <h5>Good to Have</h5>
              <p>
                {job.goodToHave.map((r, index) => (
                  <span key={index}> {r},</span>
                ))}
              </p>
            </div>
            <div>
              <p>
                <span className="side_title">Education :</span> {job.education}
              </p>
            </div>
          </div>
          <div>
            <div>
              <h5>Key Skill</h5>
              <p className="Skills_tags_container">
                {job.mustHave.map((r, index) => (
                  <span key={index} className="Skill_tags">
                    {r}
                  </span>
                ))}
                {job.goodToHave.map((r, index) => (
                  <span key={index} className="Skill_tags">
                    {r}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className="apply_btns">
            <Button
              className="back_btn"
              variant="text"
              onClick={(e) => history.goBack()}
            >
              <ArrowBackIosNewSharpIcon /> Back
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
