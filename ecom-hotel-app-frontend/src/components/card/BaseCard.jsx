import React from 'react'
import '../card/style.css'
export const BaseCard = ({ image, title, body,roomType, roomPrice, onBookNowClick, footer }) => {

    console.log('Image:', image);
    console.log('Title:', title);

    return (
      <div className="card">
        <div className="card-image">
          <img src={image} alt="Room" />
        </div>
        <div className="card-content">
          {title && <h3 className="card-title">{title}</h3>}
          {body && <p className="card-description">{body}</p>}
          <div className="card-details">
            {roomPrice && <p className="card-price">{roomPrice}</p>}
            {roomType && <p className="card-room-type">{roomType}</p>}
            {onBookNowClick && <button className="book-now-btn" onClick={onBookNowClick}>Booking Now</button>}
          </div>
          {footer && <div className="card-footer">{footer}</div>}
        </div>
      </div>
    );
  };
