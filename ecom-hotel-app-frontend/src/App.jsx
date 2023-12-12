import './App.css'
import { AddRoom } from './components/ecomhotel/room/AddRoom'
import { ExistingRoom } from './components/ecomhotel/room/ExistingRoom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/ecomhotel/home/Home'
import { EditRoom } from './components/ecomhotel/room/EditRoom'
import { NavBar } from './components/layouts/NavBar';
import { Footer } from './components/layouts/Footer';
import { RoomListing } from './components/ecomhotel/room/RoomListing';
import { AdminDashboard } from './components/ecomhotel/admin/AdminDashboard';
import { NavBarVertical } from './components/layouts/NavBarVertical';
import { CheckOut } from './components/ecomhotel/booking/CheckOut';
import { BookingSuccess } from './components/ecomhotel/booking/BookingSuccess';

function App() {
  return (   
      <>
       
      <main> 
        {/* <NavBarVertical /> */}
        <Router>
         
          <NavBar />
         
          <Routes>
            <Route path="/" element={<Home />} />     
                <Route path="/edit-room/:id" element={<EditRoom />} />
                <Route path="/existing-rooms" element={<ExistingRoom />} />
                <Route path="/add-room" element={<AddRoom />} />
                <Route path='/booking-room/:id' element={<CheckOut />} />
                <Route path="/booking-success" element={<BookingSuccess />} />
                <Route path="/browse-all-rooms" element={<RoomListing />} />
                <Route path="/administrator" element={<AdminDashboard />} />
          </Routes>
          <Footer />
        </Router>
      </main>
    </>
  )
}

export default App
