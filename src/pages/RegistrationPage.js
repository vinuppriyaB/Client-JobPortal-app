import React, { useState } from "react";
import Card from "@mui/material/Card";
import "./RegisterPage.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import CandidateRegistration from "../component/RegisterPage/CandidateRegistration";
import RecruiterRegistration from "../component/RegisterPage/RecruiterRegistration";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// Registration page for recruiter and Candidate

const RegistrationPage = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="Registration_container">
      <Card className="Registration_Card">
        <h2>Registration</h2>

        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Candidate" value="1" />
                <Tab label="Recruiter" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <CandidateRegistration />
            </TabPanel>
            <TabPanel value="2">
              <RecruiterRegistration />
            </TabPanel>
          </TabContext>
        </Box>
      </Card>
    </div>
  );
};

export default RegistrationPage;
