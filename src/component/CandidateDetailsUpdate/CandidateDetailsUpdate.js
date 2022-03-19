import React, { useState } from "react";
import "./CandidateDetailsUpdate.css";

import { UserState } from "../../context/UserProvider";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import axios from "axios";

const CandidateDetailsUpdate = () => {
  const { user } = UserState();
  console.log(user);
  const history = useHistory();

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    const userDetail = {
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

      resume: pdfFile,
    };
    console.log(userDetail);
    try {
      let { data } = await axios.post(
        "http://localhost:5000/api/candidate/update",
        {
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

          resume: pdfFile,
        }
      );

      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        if (data.isCandidate) history.push("/candiadte");
        else history.push("/recruiter");
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
        <div>
          <InputLabel htmlFor="outlined-adornment-password">
            Education
          </InputLabel>
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
          <Button variant="text" onClick={(e) => handleUpdate(e)}>
            update
          </Button>
        </div>
        <div>
          <Button variant="contained" onClick={(e) => history.goBack()}>
            back
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CandidateDetailsUpdate;
