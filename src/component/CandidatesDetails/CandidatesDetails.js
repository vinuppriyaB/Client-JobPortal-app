import React, { useState, useEffect } from "react";
import "./CandidatesList.css";
import { UserState } from "../../context/UserProvider";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

// To display the  Candidate details to recruiter who applied forr their job post
const CandidatesDetails = ({ candidate }) => {
  const { user } = UserState();

  const history = useHistory();
  return (
    <Card
      sx={{ margin: "50px", padding: "10px 50px" }}
      className="recruiter_card"
    >
      <Box sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 70, height: 70, objectFit: "contain", pr: 2 }}
          image={candidate.pic}
          alt="Live from space album cover"
        />
        <h3>
          {candidate.firstName} {candidate.lastName}
        </h3>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        className="Candetail_cardContent"
      >
        <CardContent sx={{ margin: 0 }}>
          <h4>Education</h4>
          {candidate.education.map((edu, index) => (
            <div key={index}>
              <p>Degree : {edu.degree}</p>
              <p>Institution : {edu.institution}</p>
              <p>From : {edu.startYear}</p>
              <p>To : {edu.endYear}</p>
            </div>
          ))}
          <h4>Skills</h4>
          {candidate.skills.map((s, index) => (
            <span key={index}> {s}</span>
          ))}
        </CardContent>
        <CardContent sx={{ margin: 0 }}></CardContent>
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
          <a href={candidate.resume} target="_blank">
            <Button variant="contained" className="view_btn">
              view resume
            </Button>
          </a>
        </Box>
      </Box>
    </Card>
  );
};

export default CandidatesDetails;
