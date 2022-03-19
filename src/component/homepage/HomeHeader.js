import React from "react";
import Button from "@mui/material/Button";
import "./HomeHeader.css";
import { useHistory } from "react-router";

const HomeHeader = () => {
  const history = useHistory();
  return (
    <div className="Homeheader_container">
      <div className="header_left">
        <h3>Job Portal</h3>
      </div>
      <div className="header_right">
        <Button variant="text" onClick={() => history.push("/register")}>
          register
        </Button>
        <Button variant="text" onClick={() => history.push("/login")}>
          Login
        </Button>
        <Button variant="text" onClick={() => history.push("/recruiter")}>
          rec
        </Button>
        <Button variant="text" onClick={() => history.push("/candidate")}>
          can
        </Button>
      </div>
    </div>
  );
};

export default HomeHeader;
