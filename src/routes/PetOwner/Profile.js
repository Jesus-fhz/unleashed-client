import React from 'react';
import EditPetList from '../../components/EditPetList';
import UserProfile from '../../components/UserProfile';
import '../../style/profile.scss';

const Profile = () => {
  return (
    <div className="profile">
      <EditPetList />
      <UserProfile />
    </div>
  )
}

export default Profile;