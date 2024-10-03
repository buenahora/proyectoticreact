import React, { useState } from 'react';
import Schedule from './Schedule';
import TicketSelector from './TicketSelector';
import TotalCost from './TotalCost';
import './Reservation.css';
import { Link } from 'react-router-dom';


export default function Reservation() {
  const [adultTickets, setAdultTickets] = useState(0);
  const [studentTickets, setStudentTickets] = useState(0);
  const [childTickets, setChildTickets] = useState(0);
  const [seniorTickets, setSeniorTickets] = useState(0);

  // Precios de los tickets
  const ticketPrices = {
    adult: 500,
    student: 150,
    child: 70,
    senior: 300,
  };

  // Descuento especial por este mes
  const [specialDiscount, setSpecialDiscount] = useState(true);

  // Función para calcular el total
  const calculateTotal = () => {
    let total = 
      adultTickets * ticketPrices.adult +
      studentTickets * ticketPrices.student +
      childTickets * ticketPrices.child +
      seniorTickets * ticketPrices.senior;
    
    // Si el descuento está activo, establecer total a 0
    if (specialDiscount) {
      total = 0;
    }

    return total;
  };

  return (
    <div className="app-container">
      <header>
        <h1>WHAT THE FUN CINEMA</h1>
        <nav>
        <Link to="/register"><button>Registro</button></Link>
        <Link to="/login"><button>Log In</button></Link>
          <button>Catálogo</button>
        <Link to="/"><button>Home</button></Link>
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
      <div className="discount-info">
        {specialDiscount && <p>Descuento espacial aplicado: las entardas son gratis este mes!</p>}
      </div>
      <TotalCost total={calculateTotal()} />
    </div>
  );
}
