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
        <h3>JOB PORTAL APPLICATION</h3>
      </div>
    </div>
  );
};

export default HomeHeader;
