import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../style/header.scss'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const handleOpen = () => { 
    isOpen ? setIsOpen(false) : setIsOpen(true);
  }

  return (
    <div className="header">
      <h1>
        <button onClick={() => handleOpen()}>(menu)</button>
        <Link to="/">Unleashed</Link>
      </h1>
      <aside className={isOpen ? "active" : ""}>
        <button onClick={() => handleOpen()}>
          &times;
        </button>
        <nav>
          {/* <Link to="/">Home</Link> */}
          <Link to="/">My Pet</Link>
          <Link to="/owner/profile">User</Link>
          {console.log('context',authContext)}
          <button onClick={()=>{authContext.onLogout()}} >Log Out</button>
        </nav>
      </aside>
    </div>
  )
}

export default Header;