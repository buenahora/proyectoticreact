import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ContenedorPelicula.module.css';

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
        <div className={styles.contenedorPelicula} onClick={handleClick} id={Id}>
            <img src={FrontPage} alt="Front Page" className={styles.imagenPelicula}/>
            <h1 className={styles.title}>{Name}</h1> 
            <p className={styles.genre}>{Genre}</p>
        </div>
    );
};

export default ContenedorPelicula;