import React from 'react'
import '../card/style.css'
export const CardContent = ({ price, description }) => {
  return (
    <div className="card-content-custom">
      <h2 className="price">{price}</h2>
      <p className="description">{description}</p>
    </div>
  )
}
