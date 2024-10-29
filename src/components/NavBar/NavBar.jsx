import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; 
import useCookie from '../../useCookie.js';
import { useEffect } from 'react';

const NavBar = () => {

  let { cookieValue: username, setCookie: setUsername, deleteCookie: deleteUsername } = useCookie("username");

  return (
    <nav className="navbar">
      <Link to ='/'>
        <div className="navbar-logo">
          WHAT THE FUN CINEMA
        </div>
      </Link>

      <div className="navbar-links">
        {!username ? (
          <>
            <Link to="/login">
              <button>Log In</button>
            </Link>
            <Link to="/register">
              <button>Registro</button>
            </Link>
          </>
        ) : (
          <div className="navbar-username">
            <Link to={'/profile'}>{username}</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;



