import React from 'react';
import './Home.css'; // Importamos los estilos
import { useState, useEffect } from 'react';
import ContenedorPelicula from '../ContenedorPelicula/ContenedorPelicula.jsx';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination/Pagination.jsx';

function Home() {

  const [movies, setMovies] = useState([]);
  const [moviesCurrent, setMoviesCurrent] = useState([]);
  const [genre, setGenre] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 6;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = moviesCurrent.slice(indexOfFirstPost, indexOfLastPost);


  useEffect(() => {
    fetch('https://proyecto-tic-equipo2.onrender.com/movies')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  useEffect(() => {
    console.log(genre)
    if (genre === "todos") {
      setMoviesCurrent(movies);
    } else {
      setMoviesCurrent(movies.filter(movie => genre === "" || movie.genre === genre));
    }
  }, [genre, movies]);

  const promotions = [
    { id: 1, title: "Family Package", description: "Get 20% off when you buy 4 or more tickets", code: "FAMILY20" },
    { id: 2, title: "Student Discount", description: "Students get 15% off with valid ID", code: "STUDENT15" },
    { id: 3, title: "Matinee Special", description: "All shows before 5 PM are $2 off", code: "MATINEE2" },
  ]


  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  }


  return (
    <>
    <div className="App">
      {/* Cabecera de la página */}
      <header className="App-header">
      <div className='background_image'></div>
      <div className='data'>
      <h1 className="App-title">WTF</h1>
      <h2 className="App-subtitle">What The Fun Cinema</h2>
        <h1>Enoy the latest movies and reserve your seat!</h1>
        <p>Buy your ticket now</p>
        {/* <Link to="/reservation">
        <button className="reserve-button">Book your seat now</button>
        </Link> */}
        </div>
      </header>
      


      <section className="movies-section">
        <label htmlFor="genere-select">Select you favorite movie:</label>
        <select 
        id="genere-select"
        onChange={(e) => setGenre(e.target.value)}>
            <option value="todos">All Genres</option>

            
            {Array.from(new Set(movies.map(movie => movie.genre))).map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
            
          </select>

        <div className="movies-grid">
          {/* Reemplaza con tus imágenes o componentes */}
          {currentPosts.map(movie => (
              <ContenedorPelicula Name={movie.title} Genre={movie.genre} FrontPage={movie.frontPage} key ={movie.id} id={movie.id} movie={movie} />
            ))}

        </div>

        <Pagination postsPerPage={6} length={moviesCurrent.length} handlePagination={handlePagination} currentPage={currentPage}/>

      </section>

      <section className="membership-section">
        {/* <h2>Elige tu membresia</h2> */}
        <div className="membership-options">
          {/* <div className="membership-card">
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
          </div> */}
          {/* <div className="membership-card">
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
          </div> */}

      <section className="promotionsSection">
            <h2 className="sectionTitle">Special Offers</h2>
            <div className="promotionsGrid">
              {promotions.map((promo) => (
                <div key={promo.id} className="promotionCard">
                  <h3 className="promotionTitle">{promo.title}</h3>
                  <p className="promotionDescription">{promo.description}</p>
                  <span className="promotionCode">Use code: {promo.code}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>

    </>
    
  );
}

export default Home;