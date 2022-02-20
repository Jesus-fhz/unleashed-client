import React from 'react';
import { Link } from 'react-router-dom';
import '../style/header.scss'

const Header = () => {
  return (
    <div className="header">
      <h1>
        <Link to="/">Unleashed</Link>
      </h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/">My Pet</Link>
        <Link to="/owner/profile">User</Link>
        <Link to="/logout">Log out</Link>
      </nav>
    </div>
  )
}

export default Header;