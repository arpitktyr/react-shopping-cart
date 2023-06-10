import React, { useEffect, useState } from "react";
export const UserContext = React.createContext(null);

const UserContextProvider = (props) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const storedContextData = localStorage.getItem("userContextData");

    if (storedContextData) {
      const { name, email, id } = JSON.parse(storedContextData);
      setUserName(name);
      setUserEmail(email);
      setUserID(id);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "userContextData",
      JSON.stringify({ name: userName, email: userEmail, id: userID })
    );
  }, [userName, userEmail, userID]);

  return (
    <UserContext.Provider
      value={{
        userName,
        userEmail,
        setUserEmail,
        setUserName,
        userID,
        setUserID,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
