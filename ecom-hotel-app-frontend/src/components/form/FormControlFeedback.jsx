// FormControlFeedback.js
import React from 'react';
import '../form/style.css'

export const FormControlFeedback = ({ message, type, isValid }) => {
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
    <div className={`feedback-message ${type} form-control-feedback ${isValid ? 'valid-feedback' : 'invalid-feedback'}`} style={{ color }}>
      {message}
      {isValid ? <p style={{ color:"green" }} >Looks good!</p> : <p style={{color:"red"}}>Please provide a valid input.</p>}
    </div>
  );
};

