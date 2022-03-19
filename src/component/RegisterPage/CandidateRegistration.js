import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { UserState } from "../../context/UserProvider";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./CandidateRegistration.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import axios from "axios";

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
  const [resume, setResume] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");

  // for submit event
  const [viewPdf, setViewPdf] = useState(null);

  // onchange event
  const fileType = ["application/pdf"];

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
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError("");
        };
      } else {
        setPdfFile(null);
        setPdfFileError("Please select valid pdf file");
      }
    } else {
      console.log("select your file");
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const userDetail = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      degree: degree,
      institution: institution,
      startYear: startYear,
      endYear: endYear,
      resume: pdfFile,
    };
    console.log(userDetail);
    try {
      let res = await axios.post(
        "http://localhost:5000/api/candidate/register",
        {
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

          resume: pdfFile,
        }
      );
      console.log(res);
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
      <div>
        <InputLabel htmlFor="outlined-adornment-password">Education</InputLabel>
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
      <div>
        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder="Start Year"
          fullWidth
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder="End Year"
          fullWidth
          value={endYear}
          onChange={(e) => setEndYear(e.target.value)}
        />
      </div>
      <input
        type="file"
        className="form-control"
        required
        onChange={handlePdfFileChange}
      />
      <div>
        <Button variant="text" onClick={() => history.push("/login")}>
          Have Account
        </Button>
      </div>
      <div>
        <Button variant="contained" onClick={(e) => handleRegister(e)}>
          Register
        </Button>
      </div>
    </div>
  );
};

export default CandidateRegistration;
