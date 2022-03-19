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

const RecruiterPostUpdate = () => {
  const { user, handleGetPost, jobPost } = UserState();
  console.log(user);
  const { id } = useParams();
  console.log(id);
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
  useEffect(() => {
    getJobDetails();
  }, []);
  const getJobDetails = async () => {
    try {
      let res = await axios.get(`http://localhost:5000/api/job/getJob/${id}`);
      console.log(res);
      if (res) {
        console.log(res.data);
        let result = res.data;
        setCompanyName(result.companyName);
        setlogo(result.logo);
        setRole(result.role);
        setPlace(result.place);
        setJobType(result.jobType);
        setCTC(result.CTC);
        setOpening(result.opening);
        setRoundCount(result.roundCount);
        setRounds(result.Rounds);

        // handleGetPost(user._id);
        // localStorage.setItem("userInfo", JSON.stringify(res.data));

        // history.push("/chats");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const updateJobDetails = async (e) => {
    e.preventDefault();
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
      Rounds: Rounds,
    };
    console.log(bodyData);
    try {
      let res = await axios.put(
        `http://localhost:5000/api/job/updatejob/${id}`,
        bodyData
      );
      console.log(res);
      if (res) {
        console.log(res.data);
        // handleGetPost(user._id);
        // localStorage.setItem("userInfo", JSON.stringify(res.data));

        // history.push("/chats");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="login_container">
      <Card
        sx={{ minWidth: 375, maxWidth: 775, padding: "25px" }}
        className="login_Card"
      >
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
          <Button variant="contained" onClick={(e) => updateJobDetails(e)}>
            update
          </Button>
          <Button
            variant="contained"
            onClick={(e) => history.push("/recruiter")}
          >
            Back
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RecruiterPostUpdate;
