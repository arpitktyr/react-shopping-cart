import React, { useEffect, useState } from "react";
export const UserContext = React.createContext(null);

const UserContextProvider = (props) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const storedContextData = localStorage.getItem("userContextData");

    if (storedContextData) {
      const { name, email } = JSON.parse(storedContextData);
      setUserName(name);
      setUserEmail(email);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "userContextData",
      JSON.stringify({ name: userName, email: userEmail })
    );
  }, [userName, userEmail]);

  return (
    <UserContext.Provider
      value={{ userName, userEmail, setUserEmail, setUserName }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
