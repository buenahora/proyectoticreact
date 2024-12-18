import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import bcrypt from 'bcryptjs';

export default function CinemaRegister() {
  const navigate = useNavigate();
  

  const [fullName, setFullName] = useState(''); // Nuevo estado para el nombre
  const [email, setEmail] = useState(''); // Nuevo estado para el email
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hash, setHash] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {

    const [name, lastName] = fullName.split(" ");
    console.log( JSON.stringify({
      name,
      lastName,
      mail: email,
      password: hash,
    }))
    try {
      const response = await fetch('https://proyecto-tic-equipo2east.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', // Add this line if your server expects it
        },
        body: JSON.stringify({
          name,
          lastName,
          mail: email,
          password: hash,
        }),
      });

      if (!response.ok) {
        console.log(response);
        const errorData = await response.json();
        console.log(errorData);
       setError(errorData.message || 'Network response was not ok');
       return
      }

      const data = await response.json();
      
      console.log('Registration successful:', data);
      setError(data.message);


      setTimeout(() => {
        navigate('/login');
      }, 2000);

      // Navigate to another page or show success message
    } catch (error) {
      console.error('There was a problem with the registration:', error);
      setError('Registration failed. Please try again.');
    }
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);

  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    console.log("la password es "+password)

    // Para hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    console.log("La passwd hasheada es " + hashedPassword);


    setHash(hashedPassword);
    console.log("La passwd hasheada es " + hashedPassword);
    console.log('Hashed Password:', hashedPassword);
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    setError('');
  };

  React.useEffect(() => {
    if (hash) {
      handleRegister();
    }
  }, [hash]);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.iconContainer}>
          <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
        </div>
        <h2 className={styles.title}>Create your account</h2>
        <form className={styles.form} onSubmit={handleSubmit}> {/* onSubmit */}
          <input
            type="text"
            placeholder="Full Name"
            className={styles.input}
            value={fullName} // Vinculando el valor
            onChange={handleFullNameChange} // Vinculando el evento
            required
          />
          <input
            type="email"
            placeholder="Email address"
            className={styles.input}
            value={email} 
            onChange={handleEmailChange} 
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password} 
            onChange={handlePasswordChange} 
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.input}
            value={confirmPassword} 
            onChange={handleConfirmPasswordChange} 
            required
          />
          {error && <p className={styles.error}>{error}</p>} {/* Mostrar error si hay */}
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

