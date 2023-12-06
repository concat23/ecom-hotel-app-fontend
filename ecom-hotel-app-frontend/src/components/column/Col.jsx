import React from 'react';

export const Col = ({ xs, md, lg, children }) => {
  return (
    <div style={{ 
      margin: '0.5rem', 
      flexBasis: xs ? `${xs * 8.333}%` : md ? `${md * 8.333}%` : '100%', 
      maxWidth: lg ? `${lg * 8.333}%` : '100%',
    }}>
      {children}
    </div>
  );
};
