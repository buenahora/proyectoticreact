import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.tsx';
import Register from './components/Register/Register.tsx';
import Reservation from './components/Reservation/Reservation.jsx';
import NavBar from './components/NavBar/NavBar.jsx';


function App() {
  //Llamada a la API para mostrar todas las peliculas, 
  //se llama unicamente la primera vez que se carga la pagina

  return (
    <Router>
      <div className="App">
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reservation" element={<Reservation />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;