import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../carousel/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const CarouselStyle = ({ rooms, indicators, currentIndex }) => {   // Auto slide
  // const [currentIndex, setCurrentIndex] = useState(0);  // Manual click slide

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === rooms.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? rooms.length - 1 : prevIndex - 1
    );
  };

  // Check if rooms is undefined or has zero length
  if (!rooms || rooms.length === 0) {
    return <div className="carousel-placeholder">No Rooms</div>;
  }

  return (
    <div className="carousel">
      {indicators && rooms.length > 1 && (
        <div className="card-carousel-indicators">
          {rooms.map((_, index) => (
            <div
              key={index}
              className={`card-carousel-indicator ${currentIndex === index ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      )}
      <button className="arrow left" onClick={goToPrevSlide}>
          <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      {rooms.length > 0 && (
        <div className="card-carousel">
          <img
            className="card-carousel-image"
            src={`data:image/jpeg;base64,${rooms[currentIndex].photo}`}
            alt={`Slide ${currentIndex + 1}`}
          />
          <div className="card-carousel-body">
            <h2>{rooms[currentIndex].roomType}</h2>
            <p>{rooms[currentIndex].description}</p>
            <p className="card-carouselprice">Price: ${parseFloat(rooms[currentIndex].roomPrice).toFixed(2)}</p>
          </div>
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
};

CarouselStyle.defaultProps = {
  indicators: true,
};

export default CarouselStyle;