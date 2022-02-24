import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import dog_icon from '../assets/images/dog_icon.svg';
import user_icon from '../assets/images/user_icon.svg';
import home_icon from '../assets/images/home_icon.svg';
import '../style/nav.scss';
import { AuthContext } from '../context/AuthContext';

const Nav = () => {
  const auth = useContext(AuthContext)
  return (
    <nav className="nav">
      <Link to="/owner/profile">
        <img src={user_icon} alt="my page"/>
        <p>My page</p>
      </Link>
      <Link to="/owner/edit_profile">
        <img src={user_icon} alt="edit profile"/>
        <p>Edit Profile</p>
      </Link>
      { 
        auth.user.user_type === "owner"
        ?
        <Link to="/owner/register">
          <img src={dog_icon} alt="Add my pet"/>
          <p>Add my pet</p>
        </Link>
        :
        ""
      }
    </nav>
  )
}

export default Nav;