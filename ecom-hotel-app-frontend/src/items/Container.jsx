import React from 'react';

const containerStyles = {
  maxWidth: '1200px',  // Set a maximum width for the container
  margin: '0 auto',    // Center the container horizontally
  padding: '20px',     // Add some padding inside the container
  background: '#f7f7f7', // Set a light background color
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Add a subtle box shadow
  borderRadius: '8px', // Add rounded corners
};

export const Container = ({ children }) => {
  return (
    <div style={containerStyles}>
      {children}
    </div>
  );
};
