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
  const [selectedMovie, setSelectedMovie] = useState(''); // Estado para la película seleccionada

  // neighborhood list
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

  // movies list
  const movies = [
    'Inception',
    'The Dark Knight',
    'Interstellar',
    'Titanic',
    'The Godfather',
    'Pulp Fiction',
    'The Shawshank Redemption',
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
        <label htmlFor="barrio-select">Select a neighborhood:</label>
        <select
          id="barrio-select"
          value={selectedBarrio}
          onChange={(e) => setSelectedBarrio(e.target.value)}
        >
          <option value="">Select...</option>
          {barrios.map((barrio) => (
            <option key={barrio} value={barrio}>
              {barrio}
            </option>
          ))}
        </select>
      </div>

      {/* Muestra el barrio seleccionado */}
      {selectedBarrio && <p>Selected neighborhood: {selectedBarrio}</p>}

      {/* Menú desplegable para seleccionar película */}
      <div>
        <label htmlFor="movie-select">Select a movie:</label>
        <select
          id="movie-select"
          value={selectedMovie}
          onChange={(e) => setSelectedMovie(e.target.value)}
        >
          <option value="">Select...</option>
          {movies.map((movie) => (
            <option key={movie} value={movie}>
              {movie}
            </option>
          ))}
        </select>
      </div>

      {/* Muestra la película seleccionada */}
      {selectedMovie && <p>Película seleccionada: {selectedMovie}</p>}

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
        {specialDiscount && <p>Special discount applied: tickets are free this month!</p>}
      </div>
      <div className="cost-info">
        <p>Before: ${total}</p>
      </div>

      {/* Pasamos el total con descuento al componente TotalCost */}
      <TotalCost total={discountedTotal} />
    </div>
  );
}
