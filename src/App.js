import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.tsx';
import Register from './components/Register/Register.tsx';
import Reservation from './components/Reservation/Reservation.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Movie from './components/Movie/Movie.jsx';
import Profile from './components/Profile/Profile.jsx';
import { useState } from 'react';


import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ReservationSeats from './components/ReservationSeats/ReservationSeats.jsx';

export default function App() {

  const [usernameState, setUsernameState] = useState("")

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
      <div className="App">
      <NavBar usernameState = {usernameState} setUsernameState={setUsernameState}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUsernameState={setUsernameState}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/movie/:movieId" element={<Movie />} />
          <Route path="/reservation/:cinemaId/:functionId/:dateTime" element={<ReservationSeats />} />
          <Route path="/profile" element={<Profile setUsernameState={setUsernameState} usernameState={usernameState}/>} />

        </Routes>
        <Footer />
      </div>
    </Router>
    </ThemeProvider>
  );
}