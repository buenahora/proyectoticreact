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
        <span>Adult Ticket (Age 15+): $500</span>
        <div>
          <button onClick={() => setAdultTickets(adultTickets - 1)}>-</button>
          <span>{adultTickets}</span>
          <button onClick={() => setAdultTickets(adultTickets + 1)}>+</button>
        </div>
      </div>

      <div className="ticket-type">
        <span>Student Ticket: $150</span>
        <div>
          <button onClick={() => setStudentTickets(studentTickets - 1)}>-</button>
          <span>{studentTickets}</span>
          <button onClick={() => setStudentTickets(studentTickets + 1)}>+</button>
        </div>
      </div>

      <div className="ticket-type">
        <span>Child Ticket (Under 15): $70</span>
        <div>
          <button onClick={() => setChildTickets(childTickets - 1)}>-</button>
          <span>{childTickets}</span>
          <button onClick={() => setChildTickets(childTickets + 1)}>+</button>
        </div>
      </div>

      <div className="ticket-type">
        <span>Senior Ticket (Age 65+): $300</span>
        <div>
          <button onClick={() => setSeniorTickets(seniorTickets - 1)}>-</button>
          <span>{seniorTickets}</span>
          <button onClick={() => setSeniorTickets(seniorTickets + 1)}>+</button>
        </div>
      </div>
    </div>
  );
}

export default TicketSelector;
