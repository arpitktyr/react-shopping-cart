import React, { useState, useContext, useEffect } from "react";
import EditProfile from "./EditProfile";
import { UserContext } from "../../context/user-context";
import { getWrapper } from "../../Utils";
import { Constants } from "../../Constants/Index";
import { getAuthToken } from "../../Utils/auth";

const Profile = () => {
  const { userID } = useContext(UserContext);
  const token = getAuthToken();
  const [userData, setUserData] = useState({});

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const userData = await getWrapper(
          `${Constants.apiUrl}user/${userID}`,
          "GET",
          headers
        );

        setUserData({
          email: userData.data?.email,
          pincode: userData.data?.pincode,
          name: userData.data?.name,
          address: userData.data?.address,
          mobile: userData.data?.mobile,
        });
      } catch (e) {
        setError("Something went wrong!");
      }
    };

    fetchUserData();
  }, [userID, token]);

  const handleSave = (newUserData) => {
    //console.log(newUserData);
    //setUserData(newUserData);
    let data = { ...newUserData, id: userID };
    const submitData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const userData = await getWrapper(
          `${Constants.apiUrl}updateUser`,
          "POST",
          headers,
          data
        );
        if (userData) {
          setSuccess("Form updated successfully.");
        }
      } catch (e) {
        setError("Something went wrong!");
      }
    };
    submitData();
  };

  //console.log(userData);

  return (
    <div className="container my-4">
      <h1 className="text-center">Profile</h1>
      {error && <div className=" alert alert-danger col-sm-12"> {error}</div>}
      {success && (
        <div className=" alert alert-success col-sm-12"> {success}</div>
      )}
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
