import React from 'react';
import '../card/style.css'; 

export const RoomServiceCard = ({ image, title, item, text }) => {
    return (
      <div className="room-service-cards">
        <div className="room-service-card">
          <div className="card-image">
            <img className='image-room-service' src={image} alt="Room" />
            {/* Include the image-room-service class here */}
          </div>
          <div className="card-content">
            {item && <h3 className="service-item">{item}</h3>}
            {title && <h3 className="service-title">{title}</h3>}
            <div className="service-text">{text}</div>
          </div>
        </div>
        {/* Add more RoomServiceCard components as needed */}
      </div>
    );
  };
