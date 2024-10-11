import React, {useState, useEffect} from 'react'
import styles from './Movie.module.css'
import { useParams } from 'react-router-dom'
import { MovieSharp } from '@mui/icons-material';

// This would typically come from an API or database
const cinemas = [
  {
    id: 1,
    name: "Central Cinema",
    address: "123 Main St, Cityville",
    showtimes: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"]
  },
  {
    id: 2,
    name: "Riverside Movieplex",
    address: "456 River Rd, Townsburg",
    showtimes: ["11:30 AM", "2:30 PM", "5:30 PM", "8:30 PM"]
  },
  {
    id: 3,
    name: "Suburban Cinemas",
    address: "789 Oak Ave, Suburbville",
    showtimes: ["12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"]
  }
]

export default function Movie() {

  let { movieId } = useParams();

  const [movie, setMovie] = useState({});
  
  function timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + ":" + rminutes;
    }

  useEffect(() => {
    fetch('http://localhost:3001/movies/'+movieId)
      .then(response => response.json())
      .then(data => {
        let algo = data.trailer.replace("watch?v=", "embed/")
        data.trailer = algo
        setMovie(data)
      })
      .catch(error => console.error('Error fetching movies:', error));
  }, [movieId]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

// frontPage, duration, genre, id, synopsis, title, trailer

  //Get props
  console.log(movie)
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.infoSection}>
          <h1 className={styles.title}>{movie.title}</h1>
          <div className={styles.metaInfo}>
            <span className={styles.icon}>🕒</span>
            <span>{timeConvert(movie.duration) + "hs"}</span>
            <span className={styles.badge}>PG-13</span>
          </div>
          <div className={styles.genreList}>
            <span className={styles.badge}>{movie.genre}</span>

          </div>
          <p className={styles.description}>
            {movie.synopsis}
          </p>
          <div className={styles.metaInfo}>
            <span className={styles.icon}>📅</span>
            <span>Release Date: July 16, 2010</span>
          </div>
        </div>
        <div className={styles.posterSection}>
          <img
            src={"data:image/png;base64, "+movie.frontPage}
            alt={movie.title + " movie poster"}
            className={styles.poster}
          />
        </div>
      </div>
      {/* <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Synopsis</h2>
        <p className={styles.synopsis}>
          {movie.synopsis}
        </p>
      </div> */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Trailer</h2>
        <div className={styles.trailerContainer}>
          <iframe
            src={movie.trailer}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.trailer}
          ></iframe>
        </div>
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Showtimes</h2>
        <div className={styles.cinemaGrid}>
          {cinemas.map((cinema) => (
            <div key={cinema.id} className={styles.cinemaCard}>
              <div className={styles.cinemaHeader}>
                <h3 className={styles.cinemaName}>{cinema.name}</h3>
                <div className={styles.cinemaAddress}>
                  <span className={styles.icon}>📍</span>
                  {cinema.address}
                </div>
              </div>
              <div className={styles.cinemaContent}>
                <div className={styles.showtimeList}>
                  {cinema.showtimes.map((time, index) => (
                    <button key={index} className={styles.showtimeButton}>
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}