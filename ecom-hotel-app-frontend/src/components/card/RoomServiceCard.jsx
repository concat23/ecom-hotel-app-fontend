import React from 'react';
import '../card/style.css'; 

export const RoomServiceCard = ({ image, title, item, text }) => {
    return (
    <div className='card-container'>
         <div className="room-service-cards-custom">
        <div className="room-service-custom">
          <div className="card-image-custom">
            <img className='image-room-service-custom' src={image} alt="Room" />
            {/* Include the image-room-service class here */}
          </div>
          <div className="card-content-custom">
            {item && <h3 className="service-item-custom">{item}</h3>}
            {title && <h3 className="service-title-custom">{title}</h3>}
            <div className="service-text-custom">{text}</div>
          </div>
        </div>
        {/* Add more RoomServiceCard components as needed */}
      </div>
    </div>
    );
  };
