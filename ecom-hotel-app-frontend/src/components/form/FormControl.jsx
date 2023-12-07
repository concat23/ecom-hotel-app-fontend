import React from 'react'
import '../form/style.css'

export const FormControl = ({ label, id, name,type ,value, placeholder, min, onChange, errorMessage }) => {
    return (
      <div className="form-control">
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          min={min}
          onChange={onChange}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    );
  };
