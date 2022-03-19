import React, { useState } from "react";
import Card from "@mui/material/Card";
import "./LoginPage.css";
import IconButton from "@mui/material/IconButton";
import { UserState } from "../context/UserProvider";
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

const LoginPage = () => {
  const { user, setUser } = UserState();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async (e) => {
    e.preventDefault();
    const userDetail = {
      email: email,
      password: password,
    };
    console.log(userDetail);
    try {
      let { data } = await axios.post(
        "http://localhost:5000/api/candidate/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(data);
      if (data) {
        localStorage.setItem("userData", JSON.stringify(data));
        setUser(data);
        if (data.isCandidate) history.push("/candidate");
        else history.push("/recruiter");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="login_container">
      <Card className="login_Card">
        <div>
          <h2>Login</h2>
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
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
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
          <Button variant="text" onClick={() => history.push("/register")}>
            Create New Account
          </Button>
        </div>
        <div>
          <Button variant="contained" onClick={(e) => handleLogin(e)}>
            login
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
