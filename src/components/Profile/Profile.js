import React, { useState, useContext, useEffect } from "react";
import EditProfile from "./EditProfile";
import { UserContext } from "../../context/user-context";

const Profile = () => {
  const { userName, userEmail } = useContext(UserContext);

  const [userData, setUserData] = useState({
    name: userName,
    email: userEmail,
    pincode: "209727",
    address: "Kanpur, Uttar Pradesh",
    mobile: "9956455678",
  });

  useEffect(() => {
    const data = { ...userData, email: userEmail, name: userName };
    setUserData(data);
  }, [userEmail, userName]);

  const handleSave = (newUserData) => {
    console.log(newUserData);
    setUserData(newUserData);
  };

  return (
    <div className="container my-4">
      <h1 className="text-center">Profile</h1>
      <p className="text-center">
        Keep your profile up-to-date to ensure accurate billing and shipping
        information for all your orders.
      </p>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col col-sm-6">
            <EditProfile userData={userData} onSave={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
