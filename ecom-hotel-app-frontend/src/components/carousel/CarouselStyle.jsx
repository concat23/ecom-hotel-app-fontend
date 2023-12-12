import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../carousel/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const CarouselStyle = ({ items, rooms, indicators }) => {
  const [currentSlice, setCurrentSlice] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const goToNextSlide = () => {
    setCurrentSlice((prevSlice) =>
      prevSlice === Math.ceil(rooms.length / items) - 1 ? 0 : prevSlice + 1
    );
    // Adjust currentIndex based on the next slice
    setCurrentIndex((prevIndex) =>
      prevIndex + items < rooms.length ? prevIndex + items : 0
    );
  };
  
  const goToPrevSlide = () => {
    setCurrentSlice((prevSlice) =>
      prevSlice === 0 ? Math.ceil(rooms.length / items) - 1 : prevSlice - 1
    );
    // Adjust currentIndex based on the previous slice
    setCurrentIndex((prevIndex) =>
      prevIndex - items >= 0 ? prevIndex - items : rooms.length - 1
    );
  };
  

  // Check if rooms is undefined or has zero length
  if (!rooms || rooms.length === 0) {
    return <div className="carousel-placeholder">No Rooms</div>;
  }

  const startIdx = currentSlice * items;
  const endIdx = startIdx + items;
  const visibleRooms = rooms.slice(startIdx, endIdx);

  return (
    <div className="carousel">
      {indicators && rooms.length > 1 && (
        <div className="card-carousel-indicators">
          {Array.from({ length: Math.ceil(rooms.length / items) }, (_, index) => (
            <div
              key={index}
              className={`card-carousel-indicator ${currentSlice === index ? 'active' : ''}`}
              onClick={() => setCurrentSlice(index)}
            ></div>
          ))}
        </div>
      )}
      <button className="arrow left" onClick={goToPrevSlide}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      {visibleRooms.length > 0 && (
        <div className="card-carousel">
          {visibleRooms.map((room, idx) => (
            <div key={idx} className="carousel-item">
              <img
                className="card-carousel-image"
                src={`data:image/jpeg;base64,${room.photo}`}
                alt={`Slide ${startIdx + idx + 1}`}
              />
              <div className="card-carousel-body">
                <h2>{room.roomType}</h2>
                <p>{room.description}</p>
                <p className="card-carouselprice">Price: ${parseFloat(room.roomPrice).toFixed(0)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="arrow right" onClick={goToNextSlide}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

CarouselStyle.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      roomType: PropTypes.string,
      roomPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      description: PropTypes.string,
      photo: PropTypes.string,
    })
  ),
  indicators: PropTypes.bool,
  items: PropTypes.number,
};

CarouselStyle.defaultProps = {
  indicators: true,
  items: 4,
};

export default CarouselStyle;
