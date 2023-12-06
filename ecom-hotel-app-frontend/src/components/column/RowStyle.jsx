import React from 'react'
export const customRowStyles = {
    display: 'flex',
    flexDirection: 'column', // Change to column layout
    alignItems: 'normal', // 
    padding: '15px',
    border: '2px solid #3498db', // Change border color
    borderRadius: '8px', // Add border radius
    backgroundColor: '#f2f2f2', // Change background color
    marginBottom: '15px',
  };

export const RowStyle = ({ children }) => {
  return (
    <div style={customRowStyles}>
        {children}
    </div>
  )
}
