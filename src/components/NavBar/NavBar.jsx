import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; 
import useCookie from '../../useCookie.js';
import { useEffect, useState } from 'react'

const NavBar = ({usernameState, setUsernameState}) => {

  const { cookieValue: usernameCookie, deleteCookie: deleteUsername } = useCookie("username");

  useEffect(() => {
    console.log('cookie', usernameCookie)
    console.log('usernameState', usernameState)

    if(usernameCookie !== "") {
      setUsernameState(usernameCookie);
    }

  }, [usernameState, usernameCookie, setUsernameState])

  return (
    <nav className="navbar">
      <Link to ='/'>
        <div className="navbar-logo">
          WHAT THE FUN CINEMA
        </div>
      </Link>

      <div className="navbar-links">
        {!usernameState ? (
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
            <Link to={'/profile'}>{usernameState}</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;



