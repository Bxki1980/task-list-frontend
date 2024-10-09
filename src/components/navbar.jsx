// src/components/Navbar.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { isAuthenticated, removeToken } from '../utils/auth';
import { FaUserCircle } from 'react-icons/fa'; // Import user icon
import '../styles/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken(); // Clear the authentication token
    navigate('/login'); // Redirect to login page
  };

  const handleUserIconClick = () => {
    if (isAuthenticated()) {
      // If user is authenticated, navigate to profile or dashboard
      navigate('/tasklist');
    } else {
      // If not authenticated, navigate to login page
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand">
          MyApp
        </NavLink>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <NavLink to="/" end className="navbar-link">
              Home
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/tasklist" className="navbar-link">
              Task List
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/aboutme" className="navbar-link">
              About Me
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/contactme" className="navbar-link">
              Contact Me
            </NavLink>
          </li>
        </ul>
        <div className="navbar-icons">
          <div className="user-icon" onClick={handleUserIconClick}>
            <FaUserCircle size={28} />
          </div>
          {isAuthenticated() && (
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
