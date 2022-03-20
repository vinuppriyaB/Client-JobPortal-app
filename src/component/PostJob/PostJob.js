import React, { useState } from "react";
import "./PostJob.css";
import Card from "@mui/material/Card";
import { UserState } from "../../context/UserProvider";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import axios from "axios";

// component to post job by Rercruiter
const PostJob = () => {
  const { user, handleGetPost, jobPost } = UserState();
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
  //Function to post Job
  const handlePost = async (e) => {
    e.preventDefault();

    // Interrview Rrround arre converted from string to array
    const interviewRounds = Rounds.split(",");
    const skillMustHave = mustHave.split(",");
    const skillGoodHave = goodToHave.split(",");

    const BodyData = {
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
      let res = await axios.post(
        "https://career-growth-platforrm.herokuapp.com/api/job/postJob",
        BodyData,
        headerData
      );
      if (res) {
        // handleGetPost(user._id);
        window.alert("Post successfully");
      }
    } catch (e) {
      console.log(e);
      window.alert("Invalid Data");
    }
  };

  return (
    <div className="PostJob_container">
      <Card className="Post_Card">
        <div>
          <h2>Post Job Details</h2>
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

        <div>
          <Button
            className="button_color"
            variant="contained"
            onClick={(e) => handlePost(e)}
          >
            Post
          </Button>
        </div>
      </Card>
    </div>
  );
};
// {show ? <p>Enter rounds separated by ","</p> : ""}
export default PostJob;
