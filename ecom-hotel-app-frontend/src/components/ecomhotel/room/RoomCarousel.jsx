import React, { useEffect, useState } from 'react';
import { getAllRooms } from '../../utils/ApiFunctions';
import '../room/style.css';
import { Link } from 'react-router-dom';
import { Container } from '../../../items/Container';
import CarouselStyle from '../../carousel/CarouselStyle';

export const RoomCarousel = () => {

  const [rooms, setRooms] = useState([{ id: "", roomType: "", roomPrice: "", photo: "" }]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getAllRooms()
      .then((data) => {
        // Convert roomPrice to number
        const roomsWithNumberPrice = data.map((room) => ({
          ...room,
          roomPrice: parseFloat(room.roomPrice), // Convert to number
        }));
        setRooms(roomsWithNumberPrice);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === rooms.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
  
    return () => {
      clearInterval(interval);
    };
  }, [rooms, setCurrentIndex]);
  
  if (isLoading) {
    return <div className='mt-5'>Loading rooms ...</div>;
  }

  if (errorMessage) {
    return <div className='text-danger mt-5'>Error: {errorMessage}</div>;
  }

  return (
    <section style={{ marginTop:'-200px'}}>
      <Container>
        <Link to={"/browse-all-rooms"} className="browse-link">
          Browse all rooms
        </Link>
        <CarouselStyle rooms={rooms} currentIndex={currentIndex} />
      </Container>
    </section>
  );
};
