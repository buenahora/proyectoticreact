import React, { useState } from 'react'; 
import './Login.css'; // This CSS now uses color variables
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

export default function CinemaLogin() {

  const [email, setEmail] = useState(''); // Nuevo estado para el email
  const [password, setPassword] = useState('');
  const [hash, setHash] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();



  const handleLogin = async () => {

    if (email === '' || password === '') {
      setError('Email and password are required');
      return;
    }
    
    if (hash === '' || hash === undefined) {
      return;
    }
    
    console.log(JSON.stringify({
      mail: email,
      password: hash,
    }))


    try {
      const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', // Add this line if your server expects it
        },
        body: JSON.stringify({
          mail: email,
          password: hash,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      await response.json();
      
      // console.log('Registration successful:', data);
      // setError(data.response);

      console.log("todo bien")
      navigate('/')

      // Navigate to another page or show success message
    } catch (error) {
      console.error('There was a problem with the login:', error);
      setError("Wrong user or password");
    }
  };

  React.useEffect(() => {
    if (hash !== '' && hash !== undefined) {
      handleLogin();
    }
  }, [hash]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Para hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    setHash(password);

    handleLogin()

  }
  


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="icon-container">
          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
        </div>
        <h2 className="title">Sign in to your account</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email} 
            onChange={handleEmailChange} 
            className="input"
            required
          />
          <input
            type="password"
            value={password} 
            onChange={handlePasswordChange} 
            placeholder="Password"
            className="input"
            required
          />
          {error && <p className={"error"}>{error}</p>} {/* Mostrar error si hay */}
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