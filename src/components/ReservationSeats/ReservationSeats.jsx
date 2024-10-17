import React from 'react';
import SeatsGrid from '../SeatsGrid/SeatsGrid.jsx';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BookingSidePanel from '../BookingSidePanel/BookingSidePanel.jsx';
import styles from './ReservationSeats.module.css';


const ReservationSeats = () => {
    let { functionId, cinemaId, dateTime } = useParams();

    const [seats, setSeats] = useState([]);
    const [numRoom, setNumRoom] = useState(null);
    const [func, setFunction] = useState(null);

    const [selectedSeat, setSelectedSeat] = useState(null);
    
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
                    "userId": "2"
                });

                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                  };
    
                fetch("http://localhost:3001/reservation", requestOptions)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.error(error));

            } else {
                console.error('No seat selected');
                return;
            }

        } else {
            console.error('No seat selected');
        }
    };

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/seats`, {
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

        const fetchMovieData = async () => {

            try {
                const response = await axios.get(`http://localhost:3001/function/`+functionId);

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
        />
      </div>
    </div>

            
        </div>
    );
};

export default ReservationSeats;