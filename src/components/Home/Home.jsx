import React from 'react';
import './Home.css'; // Importamos los estilos
import { useState, useEffect } from 'react';
import ContenedorPelicula from '../ContenedorPelicula/ContenedorPelicula.jsx';
import { Link } from 'react-router-dom';

function Home() {

  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("");


  useEffect(() => {
    fetch('http://localhost:3001/movies')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <>
    <div className="App">
      {/* Cabecera de la página */}
      <header className="App-header">
      <div className='background_image'></div>
      <div className='data'>
        <h1 className="App-title">WTF</h1>
        <h2 className="App-subtitle">What The Fun Cinema</h2>
          <h1>¡Disfruta de las ultimas peliculas y reserva tu asiento!</h1>
          <p>Compra tu entrada ahora</p>
          <button className="reserve-button">Reservar ahora</button>
        </div>
      <h1 className="App-title">WTF</h1>
      <h2 className="App-subtitle">What The Fun Cinema</h2>
        <h1>¡Disfruta de las ultimas peliculas y reserva tu asiento!</h1>
        <p>Compra tu entrada ahora</p>
        <Link to="/Reservation">
        <button className="reserve-button">Reservar ahora</button>
        </Link>
      </header>


      <section className="movies-section">
        <label htmlFor="genere-select">Selecciona tu pelicula favorita:</label>
        <select onChange={(e) => setGenre(e.target.value)}>
            <option value="">All Genres</option>
            {Array.from(new Set(movies.map(movie => movie.genre))).map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>

        <div className="movies-grid">
          {/* Reemplaza con tus imágenes o componentes */}
          {movies
            .filter(movie => genre === "" || movie.genre === genre)
            .map(movie => (
              <ContenedorPelicula Name={movie.title} Genre={movie.genre} FrontPage={movie.frontPage} Id={movie.id} />
            ))}

        </div>
      </section>

      <section className="membership-section">
        <h2>Elige tu membresia</h2>
        <div className="membership-options">
          <div className="membership-card">
            <h3>Standard</h3>
            <p>$800</p>
            <ul>
              <li>Hasta 5 peliculas</li>
              <li>2 reservaciones por mes</li>
              <li>14 dias de prueba</li>
            </ul>
            <Link to="/Register">
            <button className="membership-button">Empieza gratis</button>
            </Link>
          </div>
          <div className="membership-card">
            <h3>Premium</h3>
            <p>$2500</p>
            <ul>
              <li>Peliculas ilimitadas</li>
              <li>Resrvaciones ilimitadas</li>
              <li>14 dias de prueba</li>
            </ul>
            <Link to="/Register">
            <button className="membership-button">Empieza gratis</button>
            </Link>
          </div>
        </div>
      </section>
    </div>

    </>
    
  );
}

export default Home;