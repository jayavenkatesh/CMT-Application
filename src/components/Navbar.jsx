// // Navbar.jsx
// import React from 'react';
// import './Navbar.css';
// import { useRecoilValue } from 'recoil';
// import { newemail } from '../States';
// import { Link } from 'react-router-dom';
// const Navbar = () => {
//   const userEmail=useRecoilValue(newemail)
//   return (
//     <div className="navbar">
//       <h1>Conferences</h1>
//       {/* <Link to={"/CreateConference"}> create a conference</Link> */}
//       {/* <input type="text" placeholder="Search help articles" className="search-bar" /> */}
//       {/* <span className="user-name">{username}</span> */}
//       <span className="user-name">{userEmail}</span>
//     </div>
//   );
// };

// export default Navbar;


// import React, { useState } from 'react';
// import './Navbar.css';
// import { useRecoilValue } from 'recoil';
// import { newemail } from '../States';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const userEmail = useRecoilValue(newemail);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   return (
//     <div className="navbar">
//       <h1>Conferences</h1>
//       <div className="user-menu" onClick={toggleDropdown}>
//         <span className="user-name">{userEmail}</span>
//         <div className={`dropdown ${dropdownOpen ? 'open' : ''}`}>
//           <ul>
//             <li><Link to="/profile">User Profile</Link></li>
//             <li><Link to="/change-email">Change Email</Link></li>
//             <li><Link to="/change-password">Change Password</Link></li>
//             <li><Link to="/delete-account">Delete Account</Link></li>
//             <li><Link to="/logout">Logout</Link></li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;






import React, { useState } from 'react';
import './Navbar.css';
import { useRecoilValue } from 'recoil';
import { newemail } from '../States';
import { Link } from 'react-router-dom';
import logo from "./logo.jpg"
const Navbar = () => {
  const userEmail = useRecoilValue(newemail);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img
          src={logo} // Replace with your image path
          alt="Logo"
          className="navbar-logo"
        />
        <h1>Conference Management ToolKit (CMT)</h1>
      </div>
      <div className="user-menu" onClick={toggleDropdown}>
        <span className="user-name">{userEmail}</span>
        <div className={`dropdown ${dropdownOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/profile">User Profile</Link></li>
            <li><Link to="/change-email">Change Email</Link></li>
            <li><Link to="/change-password">Change Password</Link></li>
            <li><Link to="/delete-account">Delete Account</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
