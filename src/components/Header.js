import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/header.scss'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        </nav>
      </aside>
    </div>
  )
}

export default Header;