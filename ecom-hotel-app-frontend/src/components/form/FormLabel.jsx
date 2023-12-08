import React from 'react'

export const FormLabel = ({ htmlFor, label }) => {
    return (
      <label className="custom-form-label" htmlFor={htmlFor}>
        {label}
      </label>
    );
  };
  
