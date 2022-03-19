import "./CandidateJobCard.css";
import React, { useState, useEffect } from "react";
import { UserState } from "../../context/UserProvider";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";

const CandidateJobCard = ({ job }) => {
  console.log(job.appliedby);
  const { user, canSelect, setCanSelect } = UserState();
  console.log(user);
  const history = useHistory();

  useEffect(() => {}, []);
  const handleApply = async () => {
    try {
      let res = await axios.post(
        `http://localhost:5000/api/job/apply/${job._id}/${user._id}`
      );
      console.log(res);
      if (res) {
        console.log(res.data);
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
            <p>CTC : {job.CTC}</p>
            <p>No of Rounds : {job.roundCount}</p>
            <p>
              {job.Rounds.map((r, index) => (
                <span key={index}>Rounds : {r}</span>
              ))}
            </p>
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
            // onClick={() => {
            //   history.push(`/editrecruiterpost/${job._id}`);
            // }}
          >
            Know more
          </Button>
          {job.appliedby.includes(user._id) ? (
            <Button variant="contained" disabled>
              Applied
            </Button>
          ) : (
            <Button variant="contained" onClick={(e) => handleApply(e)}>
              Apply
            </Button>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default CandidateJobCard;
