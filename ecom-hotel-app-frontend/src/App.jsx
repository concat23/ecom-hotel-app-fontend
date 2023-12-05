import './App.css'
import { AddRoom } from './components/room/AddRoom'
import { ExistingRoom } from './components/room/ExistingRoom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/home/Home'
import { EditRoom } from './components/room/EditRoom'
import { NavBar } from './components/layouts/NavBar';
import { Footer } from './components/layouts/Footer';
import { RoomListing } from './components/room/RoomListing';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { NavBarVertical } from './components/layouts/NavBarVertical';

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
