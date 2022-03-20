import "./RecruiterJobListCard.css";
import React, { useState, useEffect } from "react";
import { UserState } from "../../context/UserProvider";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

// Component to display the job post which is posted by login Recruiter

const RecruiterJobListCard = ({ job, handleGetPost }) => {
  const { user } = UserState();

  const history = useHistory();

  // function to Delete the Post

  const handleDelete = async () => {
    const headerData = {
      headers: {
        token: user.token,
      },
    };
    try {
      let res = await axios.delete(
        `https://career-growth-platforrm.herokuapp.com/api/job/delete/${job._id}`,
        headerData
      );
      if (res) {
        handleClose();
        handleGetPost(user._id, user.token);

        window.alert("Deleted Successfully");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card
      sx={{ margin: "50px", padding: "10px 50px" }}
      className="recruiter_card"
    >
      <Box
        sx={{ display: "flex", alignItems: "center" }}
        className="recruiter_card_imgBox"
      >
        <CardMedia
          component="img"
          sx={{ width: 70, height: 70, objectFit: "contain", pr: 2 }}
          image={job.logo}
          alt="Live from space album cover"
        />
        <h3>{job.companyName}</h3>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        className="Recruiter_cardContent"
      >
        <CardContent sx={{}}>
          <div>
            <h4>Role : {job.role}</h4>
            <p>Location : {job.place}</p>
            <p>Job Type : {job.jobType}</p>
            <p>Openings : {job.opening}</p>
            <p>CTC : {job.CTC}</p>
            <p>No of Rounds : {job.roundCount}</p>
            <p>
              Rounds :
              {job.Rounds.map((r, index) => (
                <span key={index}>{` ${r} ,`}</span>
              ))}
            </p>
          </div>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            gap: "40px",
            pl: 1,
            pb: 1,
          }}
          className="recruiter_card_buttons"
        >
          <p className="back_btn">
            Applied Candidates :
            <span
              style={{ fontWeight: "bolder" }}
            >{` ${job.appliedby.length}`}</span>
          </p>
          <Button
            variant="contained"
            onClick={() => {
              history.push(`/candidatedetail/${job._id}`);
            }}
            disabled={job.appliedby.length > 0 ? false : true}
            className="view_btn"
          >
            view Candidates
          </Button>
          <Button
            variant="contained"
            className="edit_btn"
            onClick={() => {
              history.push(`/editrecruiterpost/${job._id}`);
            }}
          >
            Edit <EditIcon className="icon" />
          </Button>
          <Button
            className="delete_btn"
            variant="contained"
            onClick={handleOpen}
          >
            delete <DeleteIcon className="icon" />
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure, you want delete?
              </Typography>
              <div className="recruiter_Model_buttons">
                <Button
                  variant="text"
                  className="recruiter_Model_cancel_btn"
                  onClick={() => handleClose()}
                >
                  cancel
                </Button>
                <Button
                  variant="text"
                  className="recruiter_Model_ok_btn"
                  onClick={(e) => handleDelete(e)}
                >
                  ok
                </Button>
              </div>
            </Box>
          </Modal>
        </Box>
      </Box>
    </Card>
  );
};

export default RecruiterJobListCard;
