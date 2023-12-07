// FormControlFeedback.js
import React from 'react';
import '../form/style.css'

export const FormControlFeedback = ({ message, type }) => {
  let color = '';

  switch (type) {
    case 'success':
      color = 'green';
      break;
    case 'error':
      color = 'red';
      break;
    case 'invalid':
      color = 'orange';
      break;
    default:
      color = 'black';
  }

  return (
    <div className={`feedback-message ${type}`} style={{ color }}>
      {message}
    </div>
  );
};



