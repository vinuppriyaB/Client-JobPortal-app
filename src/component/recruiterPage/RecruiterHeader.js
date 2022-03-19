import React, { useState } from "react";
import "./RecruiterHeader.css";
import Button from "@mui/material/Button";
import { UserState } from "../../context/UserProvider";
import { useHistory } from "react-router";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

const RecruiterHeader = () => {
  const { user, handleGetPost, jobPost, setUser, recSelect, setRecSelect } =
    UserState();
  console.log(recSelect);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleLogin = (e) => {
    localStorage.removeItem("userData");
    setUser("");
    history.push("/login");
  };
  return (
    <div className="RecruiterHeader_container">
      <div className="Recheader_left">
        <h3>Job Portal</h3>
      </div>
      <div className="Recheader_right bigscreen">
        <Button
          className={recSelect[0] ? " selected " : "title "}
          variant="text"
          onClick={() => {
            setRecSelect([true, false, false, false]);
            history.push("/recruiter");
          }}
        >
          home
        </Button>
        <Button
          variant="text"
          onClick={() => {
            setRecSelect([false, true, false, false]);
            history.push("/postjob");
          }}
          className={recSelect[1] ? " selected " : "title "}
        >
          PostJob
        </Button>
        <Button
          variant="text"
          onClick={() => {
            setRecSelect([false, false, true, false]);
            history.push("/recruiters/updatedetail");
          }}
          className={recSelect[2] ? " selected " : "title "}
        >
          update Profile
        </Button>

        <Button
          variant="text"
          onClick={(e) => handleLogin(e)}
          className={recSelect[3] ? " selected " : "title "}
        >
          logout
        </Button>
      </div>
      <div className="smallscreen">
        <MoreVertIcon
          className="More_icon"
          variant="contained"
          onClick={handleClick}
        />

        <Popover
          className="popover"
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <List
            className="popover_list"
            sx={{
              width: "500px",
              color: "rgba(234, 180, 30)",
              bgcolor: "rgba(8, 46, 78)",
              fontSize: "10px",

              // fontWeight: "bold",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton
              onClick={() => {
                handleClose();
              }}
            >
              <div
                className={recSelect[0] ? " selected " : "title "}
                onClick={() => {
                  setRecSelect([true, false, false, false]);
                  history.push("/recruiter");
                }}
              >
                Home
              </div>
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                handleClose();
              }}
            >
              <div
                className={recSelect[1] ? " selected" : "title"}
                onClick={() => {
                  setRecSelect([false, true, false, false]);

                  history.push("/postjob");
                }}
              >
                Post Job
              </div>
            </ListItemButton>

            <ListItemButton
              onClick={() => {
                handleClose();
              }}
            >
              <div
                className={recSelect[2] ? " selected" : "title"}
                onClick={() => {
                  setRecSelect([false, false, true, false]);
                  history.push("/recruiters/updatedetail");
                }}
              >
                Update Profile
              </div>
            </ListItemButton>

            <ListItemButton
              onClick={() => {
                handleClose();
              }}
            >
              <div
                className={recSelect[3] ? " selected" : "title"}
                onClick={(e) => handleLogin(e)}
              >
                Logout
              </div>
            </ListItemButton>
          </List>
        </Popover>
      </div>
    </div>
  );
};

export default RecruiterHeader;
