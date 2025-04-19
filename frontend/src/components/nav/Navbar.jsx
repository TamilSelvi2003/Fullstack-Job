import React from 'react';
import './Navbar.css';
import logo from '../../../src/assets/logo.jpg'

const Navbar = ({onCreateClick }) => {
   

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="" srcset="" />
        </div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Find Jobs</li>
          <li>Find Talents</li>
          <li>About us</li>
          <li>Testimonials</li>
        </ul>
        <button className="create-job-btn" onClick={onCreateClick}>Create Jobs</button>
      </nav>

      
    </>
  );
};

export default Navbar;
