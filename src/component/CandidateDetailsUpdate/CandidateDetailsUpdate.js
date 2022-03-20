import React, { useState } from "react";
import "./CandidateDetailsUpdate.css";
import { UserState } from "../../context/UserProvider";
import Card from "@mui/material/Card";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import axios from "axios";

//To update Candidate Profile Data
const CandidateDetailsUpdate = () => {
  const history = useHistory();
  const { user, setUser } = UserState();
  // console.log(user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [degree, setDegree] = useState(user.education[0].degree);
  const [institution, setInstitution] = useState(user.education[0].institution);
  const [startYear, setStartYear] = useState(user.education[0].startYear);
  const [endYear, setEndYear] = useState(user.education[0].endYear);
  const [skill, setSkill] = useState(user.skills.join(","));
  const [resume, setResume] = useState(user.resume);

  // Function to update the Candidate Details
  const handleUpdate = async (e) => {
    e.preventDefault();
    const skills = skill.split(",");
    const bodyData = {
      firstName: firstName,
      lastName: lastName,
      email: user.email,
      education: [
        {
          degree: degree,
          institution: institution,
          startYear: startYear,
          endYear: endYear,
        },
      ],
      skills: skills,
      resume: resume,
    };
    const headerData = {
      headers: {
        token: user.token,
      },
    };
    try {
      let { data } = await axios.post(
        "https://career-growth-platforrm.herokuapp.com/api/candidate/update",
        bodyData,
        headerData
      );

      if (data) {
        window.alert("Update Successfully");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="CanDetailUpdate_container">
      <Card className="CanDetailUpdate_Card">
        <div>
          <h2>Candidate Details update</h2>
        </div>
        <div>
          <InputLabel htmlFor="outlined-adornment-password">
            First Name
          </InputLabel>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <InputLabel htmlFor="outlined-adornment-password">
            Last Name
          </InputLabel>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="Candidate_Education">
          <InputLabel htmlFor="outlined-adornment-password">
            Education
          </InputLabel>

          <div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              placeholder="Degree"
              fullWidth
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              placeholder="Institution"
              fullWidth
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
            />
          </div>
          <div className="Education_timePeriod">
            <div>
              <InputLabel htmlFor="outlined-adornment-password">
                From
              </InputLabel>
              <input
                type="month"
                id="bdaymonth"
                name="bdaymonth"
                placeholder="Start Year"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
              />
            </div>
            <div>
              <InputLabel htmlFor="outlined-adornment-password">To</InputLabel>
              <input
                type="month"
                id="bdaymonth"
                name="bdaymonth"
                id="outlined-basic"
                variant="outlined"
                placeholder="End Year"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <InputLabel htmlFor="outlined-adornment-password">Skills</InputLabel>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Resume URL"
            fullWidth
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />
          <p style={{ fontSize: "11px" }}>Enter skills with comma seperation</p>
        </div>
        <div>
          <InputLabel htmlFor="outlined-adornment-password">
            Resume URL
          </InputLabel>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Resume URL"
            fullWidth
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />
        </div>

        <div>
          <Button
            className="button_color"
            variant="contained"
            onClick={(e) => handleUpdate(e)}
          >
            update
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CandidateDetailsUpdate;
