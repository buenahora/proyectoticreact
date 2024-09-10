import './App.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import ContenedorPelicula from './components/ContenedorPelicula';


function App() {

  const [totalReactPackages, setTotalReactPackages] = useState([]);

  //Llamada a la API para mostrar todas las peliculas, 
  //se llama unicamente la primera vez que se carga la pagina

  useEffect(() => {
      // GET request using fetch with error handling
      fetch('http://localhost:3000/movies', {
          headers: {
              'Access-Control-Allow-Origin': '*'
          }
      })
          .then(async response => {
              const data = await response.json();
  
              // check for error response
              if (!response.ok) {
                  // get error message from body or default to response statusText
                  const error = (data && data.message) || response.statusText;
                  return Promise.reject(error);
              }
  
              console.log(data)
              setTotalReactPackages(data);
          })
          .catch(error => {
              console.error('There was an error!', error.toString());
          });
  }, []);

  //Filtrar por genero
  //se hace de manera logica, sin llamar a la API

  const [selectedGenre, setSelectedGenre] = useState("");

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const filteredMovies = totalReactPackages.filter((movie) => {
    if (selectedGenre === "") {
      return true;
    } else {
      return movie.genre === selectedGenre;
    }
  });

  return (
    <div className="App">
      <h1>Listado de Películas:</h1>

      <select value={selectedGenre} onChange={handleGenreChange}>
        <option value="">All Genres</option>

        {/* Se cargan los generos de las peliculas borrando duplicados */}
        {totalReactPackages.map((elemento) => elemento.genre)
          .filter((genre, index, self) => self.indexOf(genre) === index)

          .map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}

      </select>

      <div className="contenedorPeliculas">
        {filteredMovies.map((elemento, index) => (
          <ContenedorPelicula
            key={index}
            Name={elemento.title}
            Genre={elemento.genre}
            FrontPage={elemento.frontPage}
            id = {elemento.id}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
