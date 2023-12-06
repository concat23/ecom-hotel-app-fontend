import React from 'react';

const customRowStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '20px',
  border: '.5px solid #9e9e9e',
  padding: '15px',
  borderRadius: '8px',
  marginBottom: '15px',
};

export const Row = ({ children}) => {
  return (
    <div style={{ ...customRowStyles }}>
      {React.Children.map(children, (child, index) => (
        <div key={index}>{child}</div>
      ))}
    </div>
  );
};
