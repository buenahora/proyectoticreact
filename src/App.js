import './App.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import ContenedorPelicula from './components/ContenedorPelicula';


function App() {

  const [totalReactPackages, setTotalReactPackages] = useState([]);

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

  return (
    <div className="App">
      <div className='contenedorPeliculas'>
          {totalReactPackages && totalReactPackages.map((elemento, index) => (
            <ContenedorPelicula key={index} Name={elemento.title} Genre={elemento.genre} FrontPage={elemento.frontPage} />
          ))}
      </div>
    </div>
  );
}

export default App;
