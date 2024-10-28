import React from 'react';
import styles from './BookingSidePanel.module.css';

const BookingSidePanel = ({ movieTitle, functionTime, selectedSeat, price, onContinue, status }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Booking Overview</h2>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.infoSection}>
          <h3 className={styles.infoTitle}>Movie</h3>
          <p className={styles.infoValue}>{movieTitle}</p>
        </div>
        <div className={styles.infoSection}>
          <h3 className={styles.infoTitle}>Function</h3>
          <p className={styles.infoValue}>{functionTime}</p>
        </div>
        <div className={styles.infoSection}>
          <h3 className={styles.infoTitle}>Selected Seat</h3>
          <p className={styles.infoValue}>{selectedSeat ? selectedSeat.seatIdString : 'No seat selected'}</p>

        </div>
        <div className={styles.infoSection}>
          <h3 className={styles.infoTitle}>Price</h3>
          <p className={styles.infoValue}>{price}</p>
        </div>
      </div>
      <div className={styles.cardFooter}>
        {status && <p className={styles.statusMessage}>{status}</p>}
        <button 
          className={styles.button}
          onClick={onContinue}
          disabled={!selectedSeat}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default BookingSidePanel;