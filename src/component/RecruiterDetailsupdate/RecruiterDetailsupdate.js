import React, { useState } from "react";
import "./RecruiterDetailsupdate.css";
import { UserState } from "../../context/UserProvider";
import Card from "@mui/material/Card";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import axios from "axios";

// To update the recruiter Profile Details

const RecruiterDetailsupdate = () => {
  const { user } = UserState();

  const history = useHistory();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [workAt, setWorkAt] = useState(user.workAt);
  const [designation, setDesignation] = useState(user.designation);

  // function for API to update the recruiter Details

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

    try {
      let { data } = await axios.post(
        "https://career-growth-platforrm.herokuapp.com/api/recruiter/update",
        bodyData,
        headerdata
      );

      if (data) {
        window.alert("Updated Successfully");
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
          <Button
            variant="contained"
            className="button_color"
            onClick={(e) => handleUpdate(e)}
          >
            update
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RecruiterDetailsupdate;
