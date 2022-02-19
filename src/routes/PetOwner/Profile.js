import React from 'react';
import UserPetList from '../../components/UserPetList';
import UserProfile from '../../components/UserProfile';
import '../../style/profile.scss';

const Profile = () => {
  return (
    <div className="profile">
      <UserProfile />
      <UserPetList />
    </div>
  )
}

export default Profile;