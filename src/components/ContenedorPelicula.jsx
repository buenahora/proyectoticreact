import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContenedorPelicula = (props) => {
    const { Name, Genre, FrontPage, Id } = props;
    const navigate = useNavigate();

    const handleClick = (event) => {
        // Redirect to another component
        // You can use React Router or any other routing library for this
        // Example using React Router:
        navigate('/movies/' + event.target.id);

    };

    return (
        <div className='contenedorPelicula' onClick={handleClick} id={Id}>
            <img src={FrontPage} alt="Front Page" className='imagenPelicula'/>
            <h1>{Name}</h1> 
            <p>{Genre}</p>
        </div>
    );
};

export default ContenedorPelicula;