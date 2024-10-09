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
  const [selectedBarrio, setSelectedBarrio] = useState('');

  // Lista de barrios
  const barrios = [
    'Punta Carretas',
    'Ciudad Vieja',
    'Pocitos',
    'Carrasco',
    'Tres Cruces',
    'Centro',
    'Malvín',
    'Buceo',
  ];

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
      {/* Menú desplegable para seleccionar barrio */}
      <div>
        <label htmlFor="barrio-select">Selecciona un barrio:</label>
        <select
          id="barrio-select"
          value={selectedBarrio}
          onChange={(e) => setSelectedBarrio(e.target.value)}
        >
          <option value="">Seleccione...</option>
          {barrios.map((barrio) => (
            <option key={barrio} value={barrio}>
              {barrio}
            </option>
          ))}
        </select>
      </div>

      {/* Muestra el barrio seleccionado */}
      {selectedBarrio && <p>Barrio seleccionado: {selectedBarrio}</p>}

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
        {specialDiscount && <p>Descuento espacial aplicado: las entradas son gratis este mes!</p>}
      </div>
      <div className="cost-info">
        <p>Costo total antes del descuento: ${total}</p>
      </div>

      {/* Pasamos el total con descuento al componente TotalCost */}
      <TotalCost total={discountedTotal} />
    </div>
  );
}
