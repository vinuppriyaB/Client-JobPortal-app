import React, { useState } from "react";
import "./RecruiterDetailsupdate.css";
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

const RecruiterDetailsupdate = () => {
  const { user } = UserState();
  console.log(user);
  const history = useHistory();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [workAt, setWorkAt] = useState(user.workAt);
  const [designation, setDesignation] = useState(user.designation);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const bodyData = {
      firstName: firstName,
      lastName: lastName,
      email: user.email,
      workAt: workAt,
      designation: designation,
    };
    const headerdata = {
      headers: {
        token: user.token,
      },
    };

    console.log(bodyData);
    try {
      let { data } = await axios.post(
        "http://localhost:5000/api/recruiter/update",
        bodyData,
        headerdata
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
    <div className="RecDetailUpdate_container">
      <Card className="RecDetailUpdate_Card">
        <div>
          <h2>Recruiter Details update</h2>
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
          <InputLabel htmlFor="outlined-adornment-password">Work At</InputLabel>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            value={workAt}
            onChange={(e) => setWorkAt(e.target.value)}
          />
        </div>
        <div>
          <InputLabel htmlFor="outlined-adornment-password">
            Designation
          </InputLabel>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
        </div>

        <div>
          <Button variant="contained" onClick={(e) => handleUpdate(e)}>
            update
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RecruiterDetailsupdate;
