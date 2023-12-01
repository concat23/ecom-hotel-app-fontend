import './App.css'
import { AddRoom } from './components/room/AddRoom'
import { ExistingRoom } from './components/room/ExistingRoom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/home/Home'
import { EditRoom } from './components/room/EditRoom'
import { NavBar } from './components/layouts/NavBar';
import { Footer } from './components/layouts/Footer';
import { Content } from './components/layouts/Content';

function App() {
  return (   
      <>
      <main> 
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />     
                <Route path="/edit-room/:id" element={<EditRoom />} />
                <Route path="/existing-rooms" element={<ExistingRoom />} />
                <Route path="/add-room" element={<AddRoom />} />
          </Routes>
          <Content location={location} />
          <Footer />
        </Router>
      </main>
    </>
  )
}

export default App
