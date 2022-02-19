import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/userProfile.scss';

const UserProfile = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    // TODO: fetch user profile data here

    // setData({...data});
  }, []);

  return (
    <section className="userProfile">
      <div className="userProfile-innerbox">
        <div className="img-container">
          <img src="" alt="" />
        </div>
        <h2>Username</h2>
        <p>user email here</p>
        <p>location here</p>
        <Link to="/">Edit my profile</Link>
      </div>
    </section>
  )
}

export default UserProfile;
