import React from 'react';

const containerStyles = {
  maxWidth: '1200px',  // Set a maximum width for the container
  margin: '0 auto',    // Center the container horizontally
  marginTop:"200px",
  display:'block',
};

export const Container = ({ children }) => {
  return (
    <div style={containerStyles}>
      {children}
    </div>
  );
};
