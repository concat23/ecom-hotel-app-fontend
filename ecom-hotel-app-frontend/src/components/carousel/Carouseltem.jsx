import React from 'react';

const CarouselItem = ({ key, imageUrl }) => {
  return (
    <div className="carousel-item" key={key}>
      <img src={imageUrl} alt="Carousel Slide" />
    </div>
  );
};

export default CarouselItem;