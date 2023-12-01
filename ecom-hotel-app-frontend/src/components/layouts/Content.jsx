import React from 'react';
import { useLocation } from 'react-router-dom';

export const Content = () => {
  const location = useLocation();

  const sectionStyle = {
    height: '100vh', // Adjust the height as needed
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  // Check if the current location is the home page
  const isHomePage = location.pathname === '/';

  return (
    <section style={sectionStyle}>
      {isHomePage && (
        // Your custom content for the home page goes here
        <div>
          <h2>Welcome to Ecom Hotel management</h2>
          {/* Add more content as needed */}
        </div>
      )}
    </section>
  );
};
