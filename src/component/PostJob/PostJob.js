import React, { useState } from "react";
import "./PostJob.css";
import Card from "@mui/material/Card";
import { UserState } from "../../context/UserProvider";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import axios from "axios";

const PostJob = () => {
  const { user, handleGetPost, jobPost } = UserState();
  console.log(user);
  const history = useHistory();
  const [companyName, setCompanyName] = useState("");
  const [logo, setlogo] = useState("");
  const [role, setRole] = useState("");
  const [place, setPlace] = useState("");
  const [jobType, setJobType] = useState("");
  const [CTC, setCTC] = useState("");
  const [opening, setOpening] = useState("");
  const [roundCount, setRoundCount] = useState("");
  const [Rounds, setRounds] = useState([]);

  const handlePost = async (e) => {
    e.preventDefault();
    const jobDetail = {
      postedby: user._id,
      companyName: companyName,
      logo: logo,
      role: role,
      place: place,
      jobType: jobType,
      CTC: CTC,
      opening: opening,
      roundCount: roundCount,
      Rounds: Rounds,
    };
    console.log(jobDetail);
    try {
      let res = await axios.post("http://localhost:5000/api/job/postJob", {
        postedby: user._id,
        companyName: companyName,
        logo: logo,
        role: role,
        place: place,
        jobType: jobType,
        CTC: CTC,
        opening: opening,
        roundCount: roundCount,
        Rounds: Rounds,
      });
      console.log(res);
      if (res) {
        console.log(res.data);
        handleGetPost(user._id);
        // localStorage.setItem("userInfo", JSON.stringify(res.data));

        // history.push("/chats");
      }
    } catch (e) {
      console.log(e);
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
          <InputLabel htmlFor="outlined-adornment-password">Logo</InputLabel>
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
            Round List
          </InputLabel>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            value={Rounds}
            onChange={(e) => setRounds(e.target.value)}
          />
        </div>

        <div>
          <Button variant="contained" onClick={(e) => handlePost(e)}>
            Post
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PostJob;
