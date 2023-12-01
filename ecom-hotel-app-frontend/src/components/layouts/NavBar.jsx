import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faKey,faRightToBracket ,faUser } from '@fortawesome/free-solid-svg-icons';
import '../layouts/style.css';

export const NavBar = () => {
  const [showAccount, setShowAccount] = useState(false);

  const handleAccountClick = () =>{
    setShowAccount(!showAccount);
  }
  return (
    <nav className="navbar-container">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <span className="logo-text">Ecom Hotel</span>
        </Link>

        <button
          type="button"
          className="navbar-toggle-btn"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggle-icon"></span>
        </button>
      </div>

      <div className="navbar-links">
        <ul className="main-links">
          <li>
            <NavLink to="/browse-all-rooms" className="nav-link" aria-current="page">
              Browse all rooms
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin" className="nav-link" aria-current="page">
              Admin
            </NavLink>
          </li>
        </ul>
        
        <ul className="user-links">
          <li>
            <NavLink to="/find-booking" className="nav-link">
              Find my booking
            </NavLink>
          </li>
           <li>
            <NavLink className="nav-link"></NavLink>
           </li>
          <li className="user-dropdown">
          <a className={`user-dropdown-toggle ${showAccount} ? "show" : "" }`}
            href="#" 
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={handleAccountClick}>
              {" "}
              <FontAwesomeIcon icon={faUser} />
          </a>
            <ul className="dropdown-menu"> 
              <li>
                <Link to="/login" className="dropdown-link">
                    <FontAwesomeIcon icon={faKey} />  Login 
                </Link>
              </li>
              <li>
                <Link to="/profile" className="dropdown-link">
                    <FontAwesomeIcon icon={faUser} /> Profile
                </Link>
              </li>
              <li>
                <Link to="/logout" className="dropdown-link">
                    <FontAwesomeIcon icon={faRightToBracket} /> Log out
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};
