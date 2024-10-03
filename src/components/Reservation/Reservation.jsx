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

  // Precios de los tickets
  const ticketPrices = {
    adult: 500,
    student: 150,
    child: 70,
    senior: 300,
  };

  // Descuento especial por este mes
  const [specialDiscount, setSpecialDiscount] = useState(true);
  const discountPercentage = 100; // Descuento del 100%

  // Función para calcular el total sin descuento
  const calculateTotal = () => {
    return (
      adultTickets * ticketPrices.adult +
      studentTickets * ticketPrices.student +
      childTickets * ticketPrices.child +
      seniorTickets * ticketPrices.senior
    );
  };

  // Función para calcular el total con descuento
  const calculateDiscountedTotal = (total) => {
    return total - total * (discountPercentage / 100);
  };

  const total = calculateTotal();
  const discountedTotal = specialDiscount ? calculateDiscountedTotal(total) : total;

  return (
    <div className="app-container">
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
      <div className="cost-info">
        <p>Costo total antes del descuento: ${total}</p>
      </div>
      {/* Pasamos el total con descuento al componente TotalCost */}
      <TotalCost total={discountedTotal} />
    </div>
  );
}
