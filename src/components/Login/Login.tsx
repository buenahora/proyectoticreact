import React from 'react';
import './Login.css'; // This CSS now uses color variables

export default function CinemaLogin() {
  return (
    <div className="container">
      <div className="form-container">
        <div className="icon-container">
          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
        </div>
        <h2 className="title">Sign in to your account</h2>
        <form className="form">
          <input
            type="email"
            placeholder="Email address"
            className="input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            required
          />
          <div className="remember-forgot">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-password">Forgot your password?</a>
          </div>
          <button type="submit" className="button">Sign in</button>
        </form>
      </div>
    </div>
  );
}