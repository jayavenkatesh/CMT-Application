// Navbar.jsx
import React from 'react';
import './Navbar.css';

const Navbar = ({ username }) => {
  return (
    <div className="navbar">
      <h1>Conferences</h1>
      <input type="text" placeholder="Search help articles" className="search-bar" />
      {/* <span className="user-name">{username}</span> */}
      <span className="user-name">{username}</span>
    </div>
  );
};

export default Navbar;
