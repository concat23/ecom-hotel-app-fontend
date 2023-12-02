import React from 'react'
import '../card/style.css'
import { FaDollarSign, FaMoneyBillAlt, FaMoneyBillWave, FaQuinscape, FaTicketAlt, FaWifi } from 'react-icons/fa';
export const BaseCard = ({ image, title, body, roomType, roomPrice, onBookNowClick, footer, item, text }) => {

  return (
      <div className="card">
          <div className="card-image">
              <img src={image} alt="Room" />
          </div>
          <div className="card-content">
              <div className="card-header">
                  <h3 className="card-title">{title}</h3>
                  {item && <span className="card-icon">{item}</span>}
              </div>
              {body && <p className="card-description">{body}</p>}
              <div className='card-text'>{text}</div>
              <div className="card-details">
                  {roomPrice && <p className="card-price">{roomPrice}<FaDollarSign /> / night</p>}
                  {roomType && <p className="card-room-type"><FaQuinscape /> {roomType}</p>}
              </div>
              {onBookNowClick && <button className="book-now-btn" onClick={onBookNowClick}>Booking Now</button>}
              {footer && <div className="card-footer">{footer}</div>}
          </div>
      </div>
  );
};
