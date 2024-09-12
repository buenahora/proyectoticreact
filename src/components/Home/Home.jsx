import React from 'react';
import './Home.css'; // Importamos los estilos

function Home() {
  return (
    <div className="App">
      {/* Cabecera de la página */}
      <header className="App-header">
      <h1 className="App-title">WTF</h1>
      <h2 className="App-subtitle">What The Fun Cinema</h2>
        <h1>¡Disfruta de las ultimas peliculas y reserva tu asiento!</h1>
        <p>Compra tu entrada ahora</p>
        <button className="reserve-button">Reservar ahora</button>
      </header>

      {/* Sección de películas */}
      <section className="movies-section">
        <h2>Busca tu pelicula favorita</h2>
        <div className="movies-grid">
          {/* Reemplaza con tus imágenes o componentes */}
          <div className="movie-card">Movie 1</div>
          <div className="movie-card">Movie 2</div>
          <div className="movie-card">Movie 3</div>
        </div>
      </section>

      {/* Planes de membresía */}
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
            <button className="membership-button">Empieza gratis</button>
          </div>
          <div className="membership-card">
            <h3>Premium</h3>
            <p>$2500</p>
            <ul>
              <li>Peliculas ilimitadas</li>
              <li>Resrvaciones ilimitadas</li>
              <li>14 dias de prueba</li>
            </ul>
            <button className="membership-button">Empieza gratis</button>
          </div>
        </div>
      </section>
    </div>

    
  );
}

export default Home;