import React from "react";
import Button from "@mui/material/Button";
import "./HomeHeader.css";
import { useHistory } from "react-router";

// homepage Nav bar
const HomeHeader = () => {
  const history = useHistory();
  return (
    <div className="Homeheader_container">
      <div className="header_left">
        <h3>Job Portal</h3>
      </div>
      <div className="header_right">
        <Button variant="text" onClick={() => history.push("/")}>
          Home
        </Button>
        <Button variant="text" onClick={() => history.push("/login")}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default HomeHeader;
