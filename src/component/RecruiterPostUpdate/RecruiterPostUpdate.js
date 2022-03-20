import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { UserState } from "../../context/UserProvider";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import axios from "axios";
import "./RecruiterPostUpdate.css";
import { useParams } from "react-router";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";

import TextareaAutosize from "@mui/material/TextareaAutosize";

// Function to Edit the posted job by Recruiter

const RecruiterPostUpdate = () => {
  const { user, handleGetPost, jobPost } = UserState();

  const { id } = useParams();

  const history = useHistory();

  const [companyName, setCompanyName] = useState("");
  const [logo, setlogo] = useState("");
  const [role, setRole] = useState("");
  const [place, setPlace] = useState("");
  const [jobType, setJobType] = useState("");
  const [CTC, setCTC] = useState("");
  const [opening, setOpening] = useState("");
  const [roundCount, setRoundCount] = useState("");
  const [Rounds, setRounds] = useState("");
  const [ExpFrom, setExpFrom] = useState("");
  const [ExpTo, setExpTo] = useState("");
  const [mustHave, setMustHave] = useState("");
  const [goodToHave, setGoodToHave] = useState("");
  const [desc, setDesc] = useState("");
  const [edu, setEdu] = useState("");

  useEffect(() => {
    getJobDetails();
  }, []);

  // Function to get data to populate in Inputfield

  const getJobDetails = async () => {
    const headerData = {
      headers: {
        token: user.token,
      },
    };

    try {
      let res = await axios.get(
        `https://career-growth-platforrm.herokuapp.com/api/job/getJob/${id}`,
        headerData
      );
      if (res) {
        let result = res.data;
        setCompanyName(result.companyName);
        setlogo(result.logo);
        setRole(result.role);
        setPlace(result.place);
        setJobType(result.jobType);
        setCTC(result.CTC);
        setOpening(result.opening);
        setRoundCount(result.roundCount);
        setRounds(result.Rounds.join(","));
        setExpFrom(result.ExpFrom);
        setExpTo(result.ExpTo);
        setMustHave(result.mustHave.join(","));
        setGoodToHave(result.goodToHave.join(","));
        setDesc(result.desc);
        setEdu(result.education);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Function to update the data in database

  const updateJobDetails = async (e) => {
    e.preventDefault();

    const interviewRounds = Rounds.split(",");
    const skillMustHave = mustHave.split(",");
    const skillGoodHave = goodToHave.split(",");

    const bodyData = {
      postedby: user._id,
      companyName: companyName,
      logo: logo,
      role: role,
      place: place,
      jobType: jobType,
      CTC: CTC,
      opening: opening,
      roundCount: roundCount,
      Rounds: interviewRounds,
      ExpFrom: ExpFrom,
      ExpTo: ExpTo,
      mustHave: skillMustHave,
      goodToHave: skillGoodHave,
      education: edu,
      desc: desc,
    };
    const headerData = {
      headers: {
        token: user.token,
      },
    };

    try {
      let res = await axios.put(
        `https://career-growth-platforrm.herokuapp.com/api/job/updatejob/${id}`,
        bodyData,
        headerData
      );
      if (res) {
        window.alert("Update Successfully");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="PostUpdate_container">
      <Card className="PostUpdate_Card">
        <div>
          <h2>Update Job Details</h2>
        </div>

        <div>
          <InputLabel htmlFor="outlined-adornment-password">
            Company Name
          </InputLabel>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div>
          <InputLabel htmlFor="outlined-adornment-password">
            Logo URL
          </InputLabel>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            value={logo}
            onChange={(e) => setlogo(e.target.value)}
          />
        </div>
        <div>
          <InputLabel htmlFor="outlined-adornment-password">Role</InputLabel>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div>
          <InputLabel htmlFor="outlined-adornment-password">Place</InputLabel>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
        </div>
        <div>
          <InputLabel htmlFor="outlined-adornment-password">
            Job Type
          </InputLabel>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          />
        </div>
        <div>
          <InputLabel htmlFor="outlined-adornment-password">
            Education
          </InputLabel>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            value={edu}
            onChange={(e) => setEdu(e.target.value)}
          />
        </div>
        <div>
          <InputLabel htmlFor="outlined-adornment-password">
            Experience
          </InputLabel>
          <div className="Experience_timePeriod">
            <div>
              <InputLabel htmlFor="outlined-adornment-password">Min</InputLabel>

              <input
                type="number"
                id="quantity"
                name="quantity"
                min="0"
                max="20"
                style={{ width: "50px", height: "30px" }}
                placeholder="0"
                value={ExpFrom}
                onChange={(e) => setExpFrom(e.target.value)}
              />
            </div>
            <div>
              <InputLabel htmlFor="outlined-adornment-password">Max</InputLabel>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="0"
                max="20"
                style={{ width: "50px", height: "30px" }}
                placeholder="20"
                value={ExpTo}
                onChange={(e) => setExpTo(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <InputLabel htmlFor="outlined-adornment-password">Skills</InputLabel>
          <div>
            <InputLabel htmlFor="outlined-adornment-password">
              Must Have
            </InputLabel>
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              value={mustHave}
              onChange={(e) => setMustHave(e.target.value)}
            />
            <p style={{ fontSize: "11px" }}>
              Enter Skills with comma seperation
            </p>
          </div>
          <div>
            <InputLabel htmlFor="outlined-adornment-password">
              Good To Have
            </InputLabel>
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              value={goodToHave}
              onChange={(e) => setGoodToHave(e.target.value)}
            />
            <p style={{ fontSize: "11px" }}>
              Enter Skills with comma seperation
            </p>
          </div>
        </div>
        <div>
          <InputLabel htmlFor="outlined-adornment-password">CTC</InputLabel>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            value={CTC}
            onChange={(e) => setCTC(e.target.value)}
          />
        </div>
        <div>
          <InputLabel htmlFor="outlined-adornment-password">
            No of Openings
          </InputLabel>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            value={opening}
            onChange={(e) => setOpening(e.target.value)}
          />
        </div>
        <div>
          <InputLabel htmlFor="outlined-adornment-password">
            About Job
          </InputLabel>
          <TextareaAutosize
            required
            maxRows={4}
            aria-label="maximum height"
            placeholder=""
            value={desc}
            style={{ width: "100%", height: 70 }}
            onChange={(event) => setDesc(event.target.value)}
          />
        </div>
        <div>
          <InputLabel htmlFor="outlined-adornment-password">
            No of Rounds
          </InputLabel>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            value={roundCount}
            onChange={(e) => setRoundCount(e.target.value)}
          />
        </div>
        <div>
          <InputLabel htmlFor="outlined-adornment-password">
            List the Rounds
          </InputLabel>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            value={Rounds}
            onChange={(e) => {
              setRounds(e.target.value);
            }}
          />
          <p style={{ fontSize: "11px" }}>Enter Rounds with comma seperation</p>
        </div>

        <div className="Update_btns">
          <Button
            className="back_btn"
            variant="text"
            onClick={(e) => history.push("/recruiter")}
          >
            <ArrowBackIosNewSharpIcon /> Back
          </Button>
          <Button
            className="button_color"
            variant="contained"
            onClick={(e) => updateJobDetails(e)}
          >
            update
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RecruiterPostUpdate;
