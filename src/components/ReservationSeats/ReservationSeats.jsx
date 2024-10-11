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
    const [selectedSeat, setSelectedSeat] = useState(null);

    const handleContinue = () => {
        console.log('Continue to payment');
    };

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/seats`, {
                    params: {
                        numRoom: functionId,
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

        fetchSeats();
        console.log('Seats:', seats);
    }, [functionId]);


    return (
        <div>
        <div className={`${styles.container} ${styles.flexContainer}`}>
      <div className={styles.seatsContainer}>
      <h1>Reservation Seats</h1>

        <SeatsGrid 
          rows={5} 
          cols={8} 
          occupiedSeats={seats}
          setSelectedSeat = {setSelectedSeat}
        />
      </div>
      <div className={styles.sidePanel}>
        <BookingSidePanel 
          movieTitle="Inception"
          functionTime="7:30 PM"
          selectedSeat={selectedSeat}
          price={12.99}
          onContinue={handleContinue}
        />
      </div>
    </div>

            
        </div>
    );
};

export default ReservationSeats;