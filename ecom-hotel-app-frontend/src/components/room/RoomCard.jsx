import React from 'react'
import { Col } from '../column/Col'
import { BaseCard } from '../card/BaseCard'
export const RoomCard = ({room}) => {
    const handleBookNow = () => {
      
        console.log('Book Now clicked');
    };
  return (
    <Col>
         <BaseCard
            key={room.id}
            image={`data:image/jpeg;base64,${room.photo}`}
            title={room.title}
            roomType={room.roomType}
            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            roomPrice={room.roomPrice}
            onBookNowClick={() => handleBookNow(room.id)}
            footer={<p>...........................</p>}
      />
    </Col>
  )
}
