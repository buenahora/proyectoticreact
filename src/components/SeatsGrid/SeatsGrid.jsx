import React, { useState } from 'react';
import styles from './SeatsGrid.module.css';

const SeatsGrid = ({ rows = 15, cols = 10, occupiedSeats = [], selectedSeat, setSelectedSeat }) => {

  const handleSeatClick = (row, col) => {
    // const seatId = `${String.fromCharCode(65 + row)}${col + 1}`;
    const seatId = `${row+1}${col + 1}`;
    console.log(seatId)

    if (!occupiedSeats.includes(seatId)) {
      const seatIdString = `${String.fromCharCode(65 + row)}${col + 1}`
      const seat = { row, col, seatId, seatIdString };
      setSelectedSeat(seat);
    }
  };

  const renderSeats = () => {
    const seats = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const seatId = `${i+1}${j + 1}`;
        const seatIdString = `${String.fromCharCode(65 + i)}${j + 1}`
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
              alt={`Seat ${seatIdString}`} 
              className={styles.seatImage} 
            />
            <span className={styles.seatLabel}>{seatIdString}</span>
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