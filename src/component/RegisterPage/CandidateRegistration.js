import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { UserState } from "../../context/UserProvider";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./CandidateRegistration.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import axios from "axios";

// Rregistration for Candidate

const CandidateRegistration = () => {
  const history = useHistory();
  const { user, setUser } = UserState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [skill, setSkill] = useState("");
  const [resume, setResume] = useState("");

  const [values, setValues] = useState({
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ [prop]: event.target.value });
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //  Store new Candidatedetailin database

  const handleRegister = async (e) => {
    e.preventDefault();

    const skills = skill.split(",");

    const bodyData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,

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

    try {
      let res = await axios.post(
        "https://career-growth-platforrm.herokuapp.com/api/candidate/register",
        bodyData
      );

      if (res.data) {
        localStorage.setItem("userData", JSON.stringify(res.data));
        setUser(res.data);
        if (res.data.isCandidate) history.push("/candidate");
        else history.push("/recruiter");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="CanReg_container">
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
        <InputLabel htmlFor="outlined-adornment-password">Last Name</InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          fullWidth
          id="outlined-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={password}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          // label="Password"
        />
      </div>
      <div className="Candidate_Education">
        <InputLabel htmlFor="outlined-adornment-password">Education</InputLabel>

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
            <InputLabel htmlFor="outlined-adornment-password">From</InputLabel>
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
          variant="text"
          className="back_btn"
          onClick={() => history.push("/login")}
        >
          Have Account
        </Button>
      </div>
      <div>
        <Button
          variant="contained"
          className="button_color"
          onClick={(e) => handleRegister(e)}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default CandidateRegistration;
// <input
//   type="file"
//   className="form-control"
//   required
//   onChange={handlePdfFileChange}
// />;
// <div>
//         <TextField
//           id="outlined-basic"
//           variant="outlined"
//           placeholder="Start Year"
//           fullWidth
//           value={startYear}
//           onChange={(e) => setStartYear(e.target.value)}
//         />
//       </div>
//       <div>
//         <TextField
//           id="outlined-basic"
//           variant="outlined"
//           placeholder="End Year"
//           fullWidth
//           value={endYear}
//           onChange={(e) => setEndYear(e.target.value)}
//         />
//       </div>
