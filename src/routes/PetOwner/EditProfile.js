import React from 'react';
import EditOwner from '../../components/EditOwner.js'
import EditPetList from '../../components/EditPetList';
import { writeUserInfo } from '../../services/users'

const EditProfile = () => {

  const handleSubmitter = (userInfo) => {
    updateProfile({...userInfo})
  }

  const updateProfile = async (data) => {
    let userInfo = {
      id: data.id,
      name: data.name,
      email: data.email,
      address: data.address,
      profile_image: data.profile_image
     };
     writeUserInfo({...userInfo})
      .then(data => console.log('data from writeUserinfo:', data))
      .catch(error => console.log('the error from writeUserInfo: ', error))
  }

  return (
    <div className="edit_profile">
      <EditPetList />
      <EditOwner handleSubmitter={handleSubmitter} />
    </div>
  )
};

export default EditProfile;