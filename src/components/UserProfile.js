import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserInfo } from '../services/users';
import '../style/userProfile.scss';
import { AuthContext } from '../context/AuthContext';

const UserProfile = () => {

  // [ data = the name of a new state object that I want to use later. setData = inbuilt function (hook) that enables you to change the previously mentioned state object. = useState({DEFAULT VALUE}). useState is an inbuilt hook function FROM REACT. It returns an array and the first item of the array is the state, the second is the action function to change the first state in the array. ]
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const authContext = useContext(AuthContext)

  console.log('HELLLOOOO', authContext.user)

  // fetch user info when the component is rendered
  useEffect(() => {
    fetchUserInfo(18)
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
