import React, { useState } from 'react';
import './Schedule.css';

function Schedule() {
  const showtimes = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  // Estado para almacenar el showtime seleccionado
  const [selectedTime, setSelectedTime] = useState(null);

  // Función para manejar la selección de showtime
  const handleShowtimeClick = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="schedule-container">
      <h2>Today's Schedule</h2>
      <div className="showtimes">
        {showtimes.map((time, index) => (
          <button
            key={index}
            className={`showtime-button ${selectedTime === time ? 'selected' : ''}`}
            onClick={() => handleShowtimeClick(time)}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Schedule;
