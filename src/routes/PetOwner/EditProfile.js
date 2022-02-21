import axios from 'axios';
import React from 'react';
import EditOwner from '../../components/EditOwner.js'
import { writeUserInfo } from '../../services/users'

const EditProfile = () => {

  const handleSubmitter = (userInfo) => {
    console.log('USER INFO:', {...userInfo})
    updateProfile({...userInfo})
  }

  const updateProfile = async (userInfo) => {
    let profileDetails = { 
      name: userInfo.name,
      email: userInfo.email
     };
     writeUserInfo({profileDetails})
      .then(data => console.log(data))
      .catch(error => console.log(error))
  }

  return (
    <div className="edit_profile">
      <EditOwner handleSubmitter={handleSubmitter} />
    </div>
  )
};

export default EditProfile;