import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchUserInfo } from '../services/users';
import '../style/userProfile.scss';

const UserProfile = () => {

  // [ data = the name of a new state object that I want to use later. setData = inbuilt function (hook) that enables you to change the previously mentioned state object. = useState({DEFAULT VALUE}). useState is an inbuilt hook function FROM REACT. It returns an array and the first item of the array is the state, the second is the action function to change the first state in the array. ]
  const authContext = useContext(AuthContext);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // fetch user info when the component is rendered
  useEffect(() => {
    const userId = authContext.user.id;

    fetchUserInfo(userId)
      .then((data) => setData(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [authContext.user.id]);

  const clickLogout = () => {
    authContext.onLogout();
  }

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
              <img src={data.profile_image} alt="" />
            </div>
            <h2>{data.name}</h2>
            <div>
              <p>Email address</p>
              <p>{data.email}</p>
            </div>
            <div>
              <p>Address</p>
              <p>{data.address}</p>
            </div>
            <div className="btn-container">
              <Link to="/owner/edit_profile" className="editBtn">Edit my profile</Link>
              <button 
                className="logoutBtn"
                onClick={clickLogout}
              >
                Log out
                </button>
            </div>
          </div>
        </section>
      }
    </>
  )
}

export default UserProfile;
