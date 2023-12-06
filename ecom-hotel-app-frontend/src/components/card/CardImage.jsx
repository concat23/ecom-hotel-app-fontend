import React from 'react';

const CardImage = ({ variant, src, alt, style }) => {
  return (
    <div className={`card-image-custom ${variant}`} style={style}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default CardImage;
