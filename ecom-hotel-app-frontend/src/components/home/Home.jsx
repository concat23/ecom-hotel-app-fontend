import React from 'react'
import '../home/style.css'
import { useLocation } from 'react-router-dom';
import Clock from '../Clock/Clock';
import { MainHeader } from '../layouts/MainHeader';
import { HotelService } from '../common/HotelService';
import { Parallax } from '../common/Parallax';
import { Content } from '../layouts/Content';
 

export const Home = () => {
  const location = useLocation();

  // Check if the current location is the home page
  const isHomePage = location.pathname === '/';

  return (
    <section className="home-section">
      <MainHeader />
      <div className="clock-container">
        {isHomePage && <Clock />}
      </div>
      <section className="content-section">
        <Content location={location} />
        <Parallax />
        <HotelService />
        <Parallax />
      </section>
    </section>
  );
};