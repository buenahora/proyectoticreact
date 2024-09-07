import React from 'react';

const ContenedorPelicula = (props) => {
    const { Name, Genre, FrontPage } = props;

    return (
        <div className='contenedorPelicula'>
            <img src={FrontPage} alt="Front Page" />
            <h1>{Name}</h1> 
            <p>{Genre}</p>
        </div>
    );
};

export default ContenedorPelicula;