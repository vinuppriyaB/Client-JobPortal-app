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
import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library

const CandidatesDetails = ({ candidate }) => {
  const { user } = UserState();
  console.log(user);
  const history = useHistory();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  //   useEffect(() => {}, []);
  //   const handleApply = async () => {
  //     try {
  //       let res = await axios.post(
  //         `http://localhost:5000/api/job/apply/${job._id}/${user._id}`
  //       );
  //       console.log(res);
  //       if (res) {
  //         console.log(res.data);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  const handleViewResume = () => {};
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
        className="Recruiter_cardContent"
      >
        <CardContent sx={{}}>
          {candidate.education.map((edu, index) => (
            <div key={index}>
              <h4>Education</h4>
              <p>Degree : {edu.degree}</p>
              <p>Institution : {edu.institution}</p>
              <p>From : {edu.startYear}</p>
              <p>To : {edu.endYear}</p>
            </div>
          ))}
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
            onClick={() => {
              handleViewResume();
            }}
          >
            resume
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default CandidatesDetails;

//   <div className="pdf-container">
//     <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
//       <Viewer
//         fileUrl={candidate.resume}
//         plugins={[defaultLayoutPluginInstance]}
//       />
//     </Worker>
//   </div>;
