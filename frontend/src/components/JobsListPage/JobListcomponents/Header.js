import React from 'react';
import { Link } from 'react-router-dom'; // ✅ this line fixes the error
import '../styles/Header.css';


const Header = () => {
  return (
    <header className="header">
      <div className="logo">GlassDoor</div>

      <nav className="nav-links">
        <a href="/" className="active">Jobs</a>
         
        <Link to="/post-job" className="nav-link">
          Post Job
        </Link>
      </nav>

      <div className="header-actions">

        <button className="icon-button message-btn">
          <i className="fa fa-envelope"></i>
        </button>
        
        <button className="icon-button notification-btn">
          <i className="fa fa-bell"></i>
        </button>
         
      </div>
    </header>
  );
};

export default Header;
