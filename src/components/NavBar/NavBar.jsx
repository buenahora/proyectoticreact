import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; 

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        WHAT THE FUN CINEMA
      </div>
      <div className="navbar-links">
        <Link to="/register">
          <button>Registro</button>
        </Link>
        <Link to="/login">
          <button>Log In</button>
        </Link>
        <Link to="/ContendorPeliculas">
        <button>Catálogo</button>
        </Link>
        <Link to="/">
          <button>Home</button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;



