import React, {useState, useEffect} from 'react'
import styles from './Movie.module.css'
import { useParams } from 'react-router-dom'
import { MovieSharp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';



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
  const [showtimes, setShowtimes] = useState([]);


  
// Structure of JSON object
//   {
//     "movie": {
//         "id": 1,
//         "title": "Inception",
//         "genre": "Science Fiction",
//         "duration": 148,
//         "synopsis": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
//         "trailer": "https://www.youtube.com/watch?v=YoHD9XEInc0",
//     },
//     "room": {
//         "numRoom": 1,
//         "cinema": {
//             "id": 1,
//             "name": "Cinema Punta Carretas",
//             "neighborhood": "Punta Carretas"
//         }
//     },
//     "showtimes": [
//         {
//             "id": 35,
//             "datetime": "2024-10-05T20:00:00",
//             "cinema": {
//                 "id": 2,
//                 "name": "Cinema Ciudad Vieja",
//                 "neighborhood": "Ciudad Vieja"
//             },
//             "room": {
//                 "numRoom": 6,
//                 "cinema": {
//                     "id": 1,
//                     "name": "Cinema Punta Carretas",
//                     "neighborhood": "Punta Carretas"
//                 }
//             },
//             "movie": {
//                 "id": 1,
//                 "title": "Inception",
//                 "genre": "Science Fiction",
//                 "duration": 148,
//                 "synopsis": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
//                 "trailer": "https://www.youtube.com/watch?v=YoHD9XEInc0",
//             }
//         }
//     ]
// }
  
const [groupedShowtimes, setGroupedShowtimes] = useState({});

useEffect(() => {

    if (!showtimes || showtimes.length === 0) {
      return;
    }

    const grouped = showtimes.reduce((acc, showtime) => {
    const cinemaName = showtime.cinema.name;
    if (!acc[cinemaName]) {
      acc[cinemaName] = [];
    }
    acc[cinemaName].push(showtime);
    return acc;
  }, {});

  setGroupedShowtimes(grouped);
}, [showtimes]);


  useEffect(() => {

    // Get today's date with the following format: 2024-10-05T20:00:00
    // const today = new Date();
    // const year = today.getFullYear();
    // const month = (today.getMonth() + 1).toString().padStart(2, '0');
    // const day = today.getDate().toString().padStart(2, '0');
    // const hours = today.getHours().toString().padStart(2, '0');
    // const minutes = today.getMinutes().toString().padStart(2, '0');
    // const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:00`;
    // console.log(formattedDate);

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/function?date=2024-10-05T20:00:00&movieId=${movieId}`);
        const data = await response.json();
        setShowtimes(data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [movieId]);

  const navigate = useNavigate();

  
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

  const handleClick = (functionId, cinemaId, dateTime) => {
    console.log('Function ID:', functionId);
    console.log('Cinema ID:', cinemaId);
    console.log('Date and Time:', dateTime);
    // Navigate to /reservation/:cinemaId/:functionId/:dateTime using the params
    navigate(`/reservation/${cinemaId}/${functionId}/${dateTime}`);
  }


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
          
          {groupedShowtimes && Object.keys(groupedShowtimes).map((cinemaName) => (
            <div key={cinemaName} className={styles.cinemaCard}>
              <div className={styles.cinemaHeader}>
                <h3 className={styles.cinemaName}>{cinemaName}</h3>
                <div className={styles.cinemaAddress}>
                  <span className={styles.icon}>📍</span>
                  {groupedShowtimes[cinemaName][0].cinema.neighborhood}
                </div>
              </div>
              <div className={styles.cinemaContent}>

                <div className={styles.showtimeList}>
                  {groupedShowtimes[cinemaName].map((showtime, index) => (
                    <button key={index} className={styles.showtimeButton} onClick={() => handleClick(showtime.id, showtime.cinema.id, showtime.datetime)}>
                      {new Date(showtime.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {" - Room: "+showtime.room.numRoom}
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