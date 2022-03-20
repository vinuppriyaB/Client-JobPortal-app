import "./CandidateJobCard.css";
import React, { useState, useEffect } from "react";
import { UserState } from "../../context/UserProvider";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

//Component for Diaplay job for Candidate
const CandidateJobCard = ({ job }) => {
  const { user, canSelect, setCanSelect } = UserState();
  const [applied, setApplied] = useState(false);
  const history = useHistory();

  // Function to Apply for job by Candidate
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
    <Card
      sx={{ margin: "50px", padding: "10px 50px" }}
      className="recruiter_card"
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CardMedia
          component="img"
          sx={{ width: 70, height: 70, objectFit: "contain", pr: 2 }}
          image={job.logo}
          alt="Live from space album cover"
        />
        <h3>{job.companyName}</h3>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        className="Recruiter_cardContent"
      >
        <CardContent sx={{}}>
          <div>
            <h4>Role : {job.role}</h4>
            <p>Location : {job.place}</p>
            <p>Job Type : {job.jobType}</p>
            <p>Openings : {job.opening}</p>
          </div>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            gap: "40px",
            pl: 1,
            pb: 1,
          }}
          className="recruiter_card_buttons"
        >
          <Button
            variant="contained"
            className="view_btn"
            onClick={() => {
              history.push(`/moreabout/${job.postedby}/${job._id}`);
            }}
          >
            Know more
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
        </Box>
      </Box>
    </Card>
  );
};

export default CandidateJobCard;
