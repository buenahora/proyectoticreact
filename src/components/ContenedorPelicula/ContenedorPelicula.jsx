import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ContenedorPelicula.module.css';

const ContenedorPelicula = (props) => {
    const { Name, Genre, FrontPage, id, movie } = props;
    const navigate = useNavigate();

    const handleClick = (event) => {
        // Redirect to another component
        // You can use React Router or any other routing library for this
        // Example using React Router:
        console.log(event.target)
        navigate('/movie/' + event.target.id);

    };

    return (
        <div className={styles.contenedorPelicula} onClick={handleClick} id={id}>
            <img src={"data:image/png;base64, "+FrontPage} alt="Front Page" className={styles.imagenPelicula} id={id} movie={movie}/>
            <h1 className={styles.title}>{Name}</h1> 
            <p className={styles.genre}>{Genre}</p>
        </div>
    );
};

export default ContenedorPelicula;