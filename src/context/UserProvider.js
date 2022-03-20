import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
const UserContext = createContext();

// Context API for data management of current userDetail

const UserProvider = ({ children }) => {
  const [jobPost, setJobPost] = useState([]);
  const [user, setUser] = useState();
  const [recSelect, setRecSelect] = useState([true, false, false, false]);
  const [canSelect, setCanSelect] = useState([true, false, false]);
  const history = useHistory();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setUser(userData);
    if (!user) history.push("/login");
  }, []);

  // Function to get Recruiter post reespectively

  const handleGetPost = async (id, token) => {
    const headerData = {
      headers: {
        token: token,
      },
    };
    try {
      let res = await axios.get(
        `https://career-growth-platforrm.herokuapp.com/api/job/getrecruiterpost/${id}`,
        headerData
      );
      // console.log(res);
      if (res) {
        // console.log(res.data);
        setJobPost(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <UserContext.Provider
      value={{
        user,
        jobPost,
        setJobPost,
        handleGetPost,
        setUser,
        recSelect,
        setRecSelect,
        canSelect,
        setCanSelect,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
};

export default UserProvider;
