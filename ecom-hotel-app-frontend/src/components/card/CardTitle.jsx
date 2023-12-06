import React from 'react';
import '../card/style.css'
const CardTitle = ({ title }) => {
  return (
    <div className="card-title-custom">
      <h2>{title}</h2>
    </div>
  );
};

export default CardTitle;
