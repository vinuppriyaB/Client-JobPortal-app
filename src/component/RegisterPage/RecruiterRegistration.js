import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import "./RecruiterRegistration.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { UserState } from "../../context/UserProvider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import axios from "axios";

const RecruiterRegistration = () => {
  const history = useHistory();
  const { user, setUser } = UserState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workAt, setWorkAt] = useState("");
  const [designation, setDesignation] = useState("");

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

  const handleRegister = async (e) => {
    e.preventDefault();
    const userDetail = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      workAt: workAt,
      designation: designation,
    };
    console.log(userDetail);
    try {
      let { data } = await axios.post(
        "http://localhost:5000/api/recruiter/register",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          workAt: workAt,
          designation: designation,
        }
      );

      if (data) {
        localStorage.setItem("userData", JSON.stringify(data));
        setUser(data);
        if (data.isCandidate) history.push("/candiadte");
        else history.push("/recruiter");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="RecRegister_container">
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

export default RecruiterRegistration;
