
import React, {useState} from 'react'
import EditProfile from './EditProfile';

const Profile = ()=>{
    const [userData, setUserData] = useState({
        name: "Aman Katiyar",
        email: "aman@gmail.com",
        pincode: "209727",
        address: "Kanpur, Uttar Pradesh",
        mobile: "9956455678",
      });
    
      const handleSave = (newUserData) => {
        console.log(newUserData);
        setUserData(newUserData);
      };

 return (
    <div className="container my-4"> 
 <h1 className='text-center'>
    Profile
 </h1>
 <p className='text-center'>Keep your profile up-to-date to ensure accurate billing and shipping information for all your orders.</p>
 <div class="container">
  <div class="row justify-content-md-center">
    <div className='col col-sm-6' >
 <EditProfile userData={userData} onSave={handleSave}/>
 </div>
 </div>
 </div></div>
 );
}
export default Profile;