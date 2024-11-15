import { useState } from 'react'
import styles from './Profile.module.css'
import { useEffect } from 'react';
import axios from 'axios';
import useCookie from '../../useCookie.js';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage({setUsernameState}) {
  const [userData, setUserData] = useState([]);
  const { cookieValue: userId, deleteCookie: deleteUserId } = useCookie("userId");
  const { cookieValue: username, deleteCookie: deleteUsername } = useCookie("username");

  const [reservations, setReservations] = useState([]);
  const [userIdState, setUserIdState] = useState(userId);

  const navigate = useNavigate();


useEffect(() => {
    console.log(userId)
    setUserIdState(userId);
}, [userId]);


useEffect(() => {
    if (userIdState) {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('https://proyecto-tic-equipo2east.onrender.com/users/' + userIdState);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchReservations = async () => {
            try {
                const response = await axios.get('https://proyecto-tic-equipo2east.onrender.com/reservation/' + userIdState);
                console.log("Las reservas son:", response.data)
                setReservations(response.data);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
        fetchUserData();
    }
}, [userIdState]);



  const handleCancelReservation = (id) => {

    const deleteReservation = async (id) => {
        console.log(id)
        try {
            const response = await axios.delete('https://proyecto-tic-equipo2east.onrender.com/reservation/' + id);

            console.log('Reservation deleted successfully');
            setReservations(prevData => {
                // Ensure prevData and prevData.reservations are defined
                if (!prevData) {
                  return prevData;
                }

                console.log("La prev data es: ", prevData)
              
                return prevData.filter(reservation => reservation.id !== id);
            });
            

        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    deleteReservation(id);


  };


  const handleLogout = () => {
    deleteUserId();
    deleteUsername();
    setUsernameState("");
    setUserData([]);
    setReservations([]);
    navigate('/');
  }


//   id:21
//   lastName: "prueba"
//   mail: "prueba10@prueba.com"
//   name: "prueba"
//   password: "$2a$10$0MysR4RdPJ5Me/IE7JIyyOSXtfCBIRu5TmS2rc8vAcvDRcEozm5G2"

return (
    userData.length === 0 ? <p>Loading...</p> :
    <div className={styles.container}>
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.containerUserInfo}>
                    <div className={styles.avatar}>
                        <img src="/profilepic.png" alt={userData.name + " " + userData.lastName} />
                    </div>
                    <div className={styles.userInfo}>
                        <h1 className={styles.userName}>{userData.name + " " + userData.lastName}</h1>
                        <p className={styles.userEmail}>{userData.mail}</p>
                    </div>
                </div>
                    <div>
                        <button className={styles.logoutButton} onClick={handleLogout}>Log Out</button>
                    </div>
            </div>


            <div className={styles.cardContent}>
                <h2 className={styles.sectionTitle}>Reservations</h2>
                {reservations.length > 0 ? (
                    <ul className={styles.reservationsList}>
                        {reservations.map((reservation) => (
                            <li key={reservation.id} className={styles.reservationItem}>
                                <div className={styles.reservationHeader}>
                                    <div>
                                        <h3 className={styles.movieTitle}>{reservation.function.movie.title}</h3>
                                        <p className={styles.dateTime}>
                                            {new Date(reservation.function.datetime).toLocaleString()}
                                        </p>
                                    </div>
                                    <span className={styles.seatsBadge}>
                                        1 Seat
                                    </span>
                                </div>
                                <div className={styles.seatsList}>
                                    <span className={styles.seatLabel}>Seats:</span>
                                        <span className={styles.seatBadge}>
                                            {`${String.fromCharCode(64 + reservation.seat.row)}${reservation.seat.columnR}`}
                                        </span>
                                </div>
                                <button 
                                    className={styles.cancelButton}
                                    onClick={() => handleCancelReservation(reservation.id)}
                                >
                                    Cancel Reservation
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reservations</p>
                )}
            </div>
        </div>
    </div>
)
}