import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [jobPost, setJobPost] = useState([]);
  const [user, setUser] = useState();
  const [recSelect, setRecSelect] = useState([true, false, false, false]);
  const [canSelect, setCanSelect] = useState([true, false, false]);
  const history = useHistory();

  useEffect(async () => {
    const userData = await JSON.parse(localStorage.getItem("userData"));
    await setUser(userData);
    await console.log(user);
    // await handleGetPost(user._id);
    if (!userData) history.push("/login");
  }, []);

  // useEffect(() => handleGetPost(), []);
  const handleGetPost = async (id) => {
    try {
      let res = await axios.get(
        `http://localhost:5000/api/job/getrecruiterpost/${id}`
      );
      console.log(res);
      if (res) {
        console.log(res.data);
        setJobPost(res.data);
        // localStorage.setItem("userInfo", JSON.stringify(res.data));

        // history.push("/chats");
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
