import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import "./CandidateHeader.css";
import { UserState } from "../../context/UserProvider";
import Popover from "@mui/material/Popover";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

// Candidate Navbar
const CandidateHeader = () => {
  const { user, setUser, canSelect, setCanSelect } = UserState();
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

  const handleLogout = (e) => {
    localStorage.removeItem("userData");
    setUser("");
    history.push("/login");
  };

  return (
    <div className="Candidateheader_container">
      <div className="Canheader_left ">
        <h3>Job Portal</h3>
      </div>
      <div className="Canheader_right bigscreen">
        <Button
          variant="text"
          onClick={() => {
            setCanSelect([true, false, false]);
            history.push("/candidate");
          }}
          className={canSelect[0] ? " selected " : " heading title "}
        >
          home
        </Button>
        <Button
          variant="text"
          onClick={() => {
            setCanSelect([false, true, false]);
            history.push("/candidates/updatedetail");
          }}
          className={canSelect[1] ? " selected " : " heading title "}
        >
          update Profile
        </Button>

        <Button
          variant="text"
          onClick={(e) => {
            setCanSelect([false, false, true]);
            handleLogout(e);
          }}
          className={canSelect[2] ? " selected " : " heading title "}
        >
          Logout
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
                className={canSelect[0] ? " selected " : "title "}
                onClick={() => {
                  setCanSelect([true, false, false, false]);
                  history.push("/candidate");
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
                className={canSelect[1] ? " selected" : "title"}
                onClick={() => {
                  setCanSelect([false, true, false, false]);

                  history.push("/candidates/updatedetail");
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
                className={canSelect[3] ? " selected" : "title"}
                onClick={(e) => handleLogout(e)}
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

export default CandidateHeader;
