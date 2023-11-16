import React from 'react'

export const Col = ({ md, children }) => {
  return (
    <div style={{ margin: '0.5rem', flexBasis: md ? `${md * 8.333}%` : '100%' }}>
      {children}
    </div>
  )
}
