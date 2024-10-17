import React from 'react';

function TicketSelector({
  adultTickets, setAdultTickets,
  studentTickets, setStudentTickets,
  childTickets, setChildTickets,
  seniorTickets, setSeniorTickets
}) {
  return (
    <div className="ticket-selector">
      <div className="ticket-type">
        <span>Adult Ticket (15+): $500</span>
        <div>
          <button onClick={() => adultTickets>0 && setAdultTickets(adultTickets - 1)} disabled={adultTickets===0}>-</button>
          <span>{adultTickets}</span>
          <button onClick={() => setAdultTickets(adultTickets + 1)}>+</button>
        </div>
      </div>

      <div className="ticket-type">
        <span> Student Ticket: $150</span>
        <div>
          <button onClick={() => studentTickets > 0 && setStudentTickets(studentTickets - 1)}disabled={studentTickets === 0}>-</button>
          <span>{studentTickets}</span>
          <button onClick={() => setStudentTickets(studentTickets + 1)}>+</button>
        </div>
      </div>

      <div className="ticket-type">
        <span>Child Ticket(Menores a 15): $70</span>
        <div>
          <button onClick={() =>childTickets>0 && setChildTickets(childTickets - 1)} disabled={childTickets===0}>-</button>
          <span>{childTickets}</span>
          <button onClick={() => setChildTickets(childTickets + 1)}>+</button>
        </div>
      </div>

      <div className="ticket-type">
        <span>Senior Ticket(65+): $300</span>
        <div>
          <button onClick={() =>seniorTickets>0 && setSeniorTickets(seniorTickets - 1)} disabled={seniorTickets===0}>-</button>
          <span>{seniorTickets}</span>
          <button onClick={() => setSeniorTickets(seniorTickets + 1)}>+</button>
        </div>
      </div>
    </div>
  );
}

export default TicketSelector;
