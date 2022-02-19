import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserInfo } from '../services/users';
import '../style/userProfile.scss';

const UserProfile = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // fetch user info when the component is rendered
  useEffect(() => {
    fetchUserInfo(75)
      .then((data) => setData(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {
        loading === true && error === false
        ?
        <p>loading...</p>
        :
        loading === false && error === true
        ?
        <p>error...</p>
        :
        <section className="userProfile">
          <div className="userProfile-innerbox">
            <div className="img-container">
              <img src="" alt="" />
            </div>
            <h2>{data.name}</h2>
            <p>email address here</p>
            <p>{data.address}</p>
            <Link to="/">Edit my profile</Link>
          </div>
        </section>
      }
    </>
  )
}

export default UserProfile;
