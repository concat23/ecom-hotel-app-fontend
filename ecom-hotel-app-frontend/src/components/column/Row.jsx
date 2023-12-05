import React from 'react';

const customRowStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '20px',
  padding: '15px',
  border: '2px solid rgb(5 5 5 / 22%)',
  borderRadius: '8px',
  backgroundColor: '#f2f2f2',
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
