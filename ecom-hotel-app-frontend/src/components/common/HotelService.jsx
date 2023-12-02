import React from 'react'
import { Container } from '../../items/Container'
import { Header } from './Header'
import { Row } from '../column/Row'
import { FaClock, FaCocktail, FaParking, FaSnowflake, FaTshirt, FaUtensils, FaWifi } from 'react-icons/fa'
import { BaseCard } from '../card/BaseCard'
import { RoomServiceCard } from '../card/RoomServiceCard'
import '../common/style.css'
import { ColStyle } from '../column/ColStyle'
export const HotelService = () => {
    const urlImage =
      'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D';
  
    return (
      <>
        <Container>
          <Header title={'Our Service'} />
  
          <Row>
            <h4 className="text-center">
              Service at <span className="hotel-color">Ecom Hotel</span>
              <span className="gap-2">
                <FaClock /> - 24-Hour Front Desk
              </span>
            </h4>
          </Row>
          <hr />
  
          <Row xs={1} md={2} lg={3} className="HotelServiceRow">
            <ColStyle>
              <RoomServiceCard
                image={urlImage}
                title={'Wifi'}
                item={<FaWifi />}
                text={'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}
                className="HotelServiceCard"
              />
            </ColStyle>
            <ColStyle>
              <RoomServiceCard
                image={urlImage}
                title={'Parking'}
                item={<FaParking />}
                text={'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}
                className="HotelServiceCard"
              />
            </ColStyle>
            <ColStyle>
              <RoomServiceCard
                image={urlImage}
                title={'Air conditioning'}
                item={<FaSnowflake />}
                text={'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}
                className="HotelServiceCard"
              />
            </ColStyle>
            <ColStyle>
              <RoomServiceCard
                image={urlImage}
                title={'Breakfast'}
                item={<FaUtensils />}
                text={'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}
                className="HotelServiceCard"
              />
            </ColStyle>
            <ColStyle>
              <RoomServiceCard
                image={urlImage}
                title={'Mini Bar'}
                item={<FaCocktail />}
                text={'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}
                className="HotelServiceCard"
              />
            </ColStyle>
            <ColStyle>
              <RoomServiceCard
                image={urlImage}
                title={'Laundry'}
                item={<FaTshirt />}
                text={'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}
                className="HotelServiceCard"
              />
            </ColStyle>
          </Row>
        </Container>
      </>
    );
  };