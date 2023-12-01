import React from 'react'
import '../home/style.css'
import { useLocation } from 'react-router-dom';
import Clock from '../Clock/Clock';

 

export const Home = () => {
  const location = useLocation();

  // Check if the current location is the home page
  const isHomePage = location.pathname === '/';

  return (
    <div>
        <h2 className='title'>Home Page</h2>
        <div>
          {isHomePage && <Clock />}
          {/* Your other home page content goes here */}
        </div>
    </div>
  )
}
