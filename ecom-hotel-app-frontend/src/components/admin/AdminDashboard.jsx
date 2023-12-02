import React from 'react'
import { Link } from 'react-router-dom'
import '../admin/style.css'
export const AdminDashboard = () => {
  return (
    <section className='adminDashboard'>
       <h2>AdminDashboard</h2> 
        <Link to={"/add-room"}>
            Manager Rooms
        </Link>
    </section>
  )
}
