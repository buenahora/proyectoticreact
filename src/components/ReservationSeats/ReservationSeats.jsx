import React from 'react';
import SeatsGrid from '../SeatsGrid/SeatsGrid.jsx';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BookingSidePanel from '../BookingSidePanel/BookingSidePanel.jsx';
import styles from './ReservationSeats.module.css';
import useCookie from '../../useCookie.js';
import { useNavigate } from 'react-router-dom';

const ReservationSeats = () => {
    let { functionId, cinemaId, dateTime } = useParams();
    const { cookieValue: userId } = useCookie("userId");


    const [seats, setSeats] = useState([]);
    const [numRoom, setNumRoom] = useState(null);
    const [func, setFunction] = useState(null);
    const [status, setStatus] = useState("");

    const [selectedSeat, setSelectedSeat] = useState(null);
    const [userIdState, setUserIdState] = useState(userId);

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!userId) {
                console.log("userId is null, redirecting to login");
                navigate('/login');
            } else {
                setUserIdState(userId);
            }
        }, 1000); // Wait for 2 seconds before checking userId

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, [userId, navigate]);

    // Removed redundant useEffect
    
    const handleContinue = () => {

        if (selectedSeat) {

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");            

            if (selectedSeat) {

                let col = selectedSeat.col + 1;
                let row = selectedSeat.row + 1;
                
                const raw = JSON.stringify({
                    "cinemaId": cinemaId.toString(),
                    "dateTime": dateTime,
                    "numRoom": numRoom.toString(),
                    "seatColumn": col.toString(),
                    "seatRow": row.toString(),
                    "userId": userIdState
                });

                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                  };
    
                fetch("https://proyecto-tic-equipo2.onrender.com/reservation", requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    setSelectedSeat(null)
                    setStatus(result)
                    fetchSeats()    
                })
                .catch((error) => {
                    setSelectedSeat(null)
                    console.error('Error:', error)
                    setStatus(error)
                });

            } else {
                console.error('No seat selected');
                return;
            }

        } else {
            console.error('No seat selected');
        }
    };

    const fetchSeats = async () => {
        try {
            const response = await axios.get(`https://proyecto-tic-equipo2.onrender.com/seats`, {
                params: {
                    numRoom: numRoom,
                    cinemaId,
                    datetime: dateTime
                }
            });

            console.log(response.data)

            let occupiedSeats = []
            response.data.forEach(seat => {
                occupiedSeats.push(seat.join(''))
            });
            console.log(occupiedSeats)
            setSeats(occupiedSeats);
           
        } catch (error) {
            console.error('Error fetching seats:', error);
        }
    };

    useEffect(() => {

        const fetchMovieData = async () => {

            try {
                const response = await axios.get(`https://proyecto-tic-equipo2.onrender.com/function/`+functionId);

                console.log(response.data)
                
                setFunction(response.data)
                setNumRoom(response.data.room.numRoom)
               
            } catch (error) {
                console.error('Error fetching seats:', error);
            }
        };
        

        fetchMovieData();
        fetchSeats();

        console.log('Seats:', seats);
    }, [functionId, numRoom]);


    return (
        <div>
        <div className={`${styles.container} ${styles.flexContainer}`}>
      <div className={styles.seatsContainer}>
      <h1>Reservation Seats</h1>

        <SeatsGrid 
          rows={15} 
          cols={10} 
          occupiedSeats={seats}
          setSelectedSeat = {setSelectedSeat}
          selectedSeat = {selectedSeat}
        />
      </div>
      <div className={styles.sidePanel}>
        <BookingSidePanel 
          movieTitle={func?.movie.title}
          functionTime={new Date('2024-10-05T20:00:00').toLocaleString()}
          duration={func?.movie.duration}
          selectedSeat={selectedSeat}
          price={"Free"}
          onContinue={handleContinue}
          status={status}
        />
      </div>
    </div>

            
        </div>
    );
};

export default ReservationSeats;