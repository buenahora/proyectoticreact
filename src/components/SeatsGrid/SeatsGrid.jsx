import React, { useState } from 'react';
import styles from './SeatsGrid.module.css';

const SeatsGrid = ({ rows = 5, cols = 8, occupiedSeats = [] }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatClick = (row, col) => {
    const seatId = `${String.fromCharCode(65 + row)}${col + 1}`;
    if (!occupiedSeats.includes(seatId)) {
      setSelectedSeat({ row, col });
    }
  };

  const renderSeats = () => {
    const seats = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const seatId = `${String.fromCharCode(65 + i)}${j + 1}`;
        const isSelected = selectedSeat?.row === i && selectedSeat?.col === j;
        const isOccupied = occupiedSeats.includes(seatId);
        seats.push(
          <button
            key={`${i}-${j}`}
            className={`${styles.seat} ${isSelected ? styles.selected : ''} ${isOccupied ? styles.occupied : ''}`}
            onClick={() => handleSeatClick(i, j)}
            disabled={isOccupied}
          >
            <img 
              src={isOccupied ? "/asientoOcupado.svg" : isSelected ? "/asientoSeleccionado.svg" : "/asiento.svg"} 
              alt={`Seat ${seatId}`} 
              className={styles.seatImage} 
            />
            <span className={styles.seatLabel}>{seatId}</span>
          </button>
        );
      }
    }
    return seats;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Choose Your Seat</h2>
      <div className={styles.seatsGrid}>
        {renderSeats()}
      </div>
      {selectedSeat && (
        <p className={styles.selectedSeatInfo}>
          Selected Seat: {String.fromCharCode(65 + selectedSeat.row)}{selectedSeat.col + 1}
        </p>
      )}
      <div className={styles.screen}>Screen</div>
    </div>
  );
};

export default SeatsGrid;