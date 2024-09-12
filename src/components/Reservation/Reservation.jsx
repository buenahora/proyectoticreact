import React, { useState } from 'react';
import Schedule from './Schedule';
import TicketSelector from './TicketSelector';
import TotalCost from './TotalCost';
import './Reservation.css';

export default function Reservation() {
  const [adultTickets, setAdultTickets] = useState(0);
  const [studentTickets, setStudentTickets] = useState(0);
  const [childTickets, setChildTickets] = useState(0);
  const [seniorTickets, setSeniorTickets] = useState(0);

  const ticketPrices = {
    adult: 500,
    student: 150,
    child: 70,
    senior: 300,
  };

  const calculateTotal = () => {
    return (
      adultTickets * ticketPrices.adult +
      studentTickets * ticketPrices.student +
      childTickets * ticketPrices.child +
      seniorTickets * ticketPrices.senior
    );
  };

  return (
    <div className="app-container">
      <header>
        <h1>WHAT THE FUN CINEMA</h1>
        <nav>
          <button>Register</button>
          <button>Log In</button>
          <button>Showtimes</button>
          <button>Reserve seats</button>
        </nav>
      </header>
      <Schedule />
      <TicketSelector
        adultTickets={adultTickets}
        setAdultTickets={setAdultTickets}
        studentTickets={studentTickets}
        setStudentTickets={setStudentTickets}
        childTickets={childTickets}
        setChildTickets={setChildTickets}
        seniorTickets={seniorTickets}
        setSeniorTickets={setSeniorTickets}
      />
      <TotalCost total={calculateTotal()} />
    </div>
  );
}


