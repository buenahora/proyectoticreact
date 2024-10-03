import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

export default function CinemaRegister() {

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.iconContainer}>
          <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
        </div>
        <h2 className={styles.title}>Create your account</h2>
        <form className={styles.form}>
          <input
            type="text"
            placeholder="Full Name"
            className={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Email address"
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.input}
            required
          />
          <div className={styles.rememberForgot}>
            <label className={styles.rememberMe}>
              <input type="checkbox" required /> I agree to the Terms and Conditions
            </label>
          </div>
          <button type="submit" className={styles.button}>Register</button>
        </form>
        <p className={styles.terms}>
          By registering, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </p>
        <p className={styles.loginLink}>
          Already have an account? <a href="" onClick={() => navigate("/login")}>Log in</a>
        </p>
      </div>
    </div>
  );
}
