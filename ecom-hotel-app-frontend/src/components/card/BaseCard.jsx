import React from 'react'
import '../card/style.css'
import { FaDollarSign, FaMoneyBillAlt, FaMoneyBillWave, FaQuinscape, FaTicketAlt, FaWifi } from 'react-icons/fa';
import { Link } from 'react-router-dom';
export const BaseCard = ({ id,image, title, body, roomCode,roomType, roomPrice, onBookNowClick, footer, item, text }) => {

  return (
      <div className="card-base">
          <div className="card-imag-base">
               
                <Link to={`/booking-room/${id}`}>
                <div className='card-roomCode-base'>
                    <h3>{roomCode}</h3>    
                </div>
                <img src={image} alt="Room" />
                </Link>
          </div>
          <div className="card-content-base">
             
              <div className="card-header-base">
                  <h3 className="card-title-base">{title}</h3>
                  {item && <span className="card-icon">{item}</span>}
              </div>
              {body && <p className="card-description-base">{body}</p>}
              <div className='card-text-base'>{text}</div>
              <div className="card-details-base">
                  {roomPrice && <p className="card-price-base">{roomPrice}<FaDollarSign /> / night</p>}
                  {roomType && <p className="card-room-type-base"><FaQuinscape /> {roomType}</p>}
              </div>
              {onBookNowClick && <button className="book-now-btn" onClick={onBookNowClick}><Link to={`/booking-room/${id}`}>Booking Now</Link></button>}
              {footer && <div className="card-footer-base">{footer}</div>}
          </div>
      </div>
  );
};
