import React from 'react';

function TotalCost({ total }) {
  return (
    <div className="total-cost">
      <h3>Costo Total: ${total}</h3>
      <button className="confirm-button">Confirm</button>
    </div>
  );
}

export default TotalCost;
