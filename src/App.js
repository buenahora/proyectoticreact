import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContenedorPelicula from './components/ContenedorPelicula';
import Home from './components/Home';
import Login from './components/Login/Login.tsx';
import Register from './components/Register/Register.tsx';


function App() {
  const [totalReactPackages, setTotalReactPackages] = useState([]);

  //Llamada a la API para mostrar todas las peliculas, 
  //se llama unicamente la primera vez que se carga la pagina

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;