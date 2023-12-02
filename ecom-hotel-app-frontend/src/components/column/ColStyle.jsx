import React from 'react'

export const ColStyle = ({ children }) => {
  return (
    <div style={{ flex: '1', boxSizing: 'border-box', padding: '0 15px', marginBottom: '20px' }}>
      {children}
    </div>
  );
};