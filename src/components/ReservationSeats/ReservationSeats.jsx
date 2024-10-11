import React from 'react';
import SeatsGrid from '../SeatsGrid/SeatsGrid.jsx';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ReservationSeats = () => {
    let { functionId } = useParams();
    const [seats, setSeats] = useState([]);

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const response = await axios.get(`http://localhost/seats/${functionId}`);
                setSeats(response.data);
            } catch (error) {
                console.error('Error fetching seats:', error);
            }
        };

        fetchSeats();
        console.log('Seats:', seats);
    }, [functionId]);

    const occupiedSeats = ['A3', 'B5', 'C2', 'D4'];

    return (
        <div>
            <h1>Reservation Seats</h1>
            
            <SeatsGrid rows={5} cols={8} occupiedSeats={occupiedSeats}/>
        </div>
    );
};

export default ReservationSeats;