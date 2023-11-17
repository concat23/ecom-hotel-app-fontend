import './App.css'
import { AddRoom } from './components/room/AddRoom'
import { ExistingRoom } from './components/room/ExistingRoom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/home/Home'
import { EditRoom } from './components/room/EditRoom'

function App() {
  return (   
      <>
      <main> 

        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit-room/:roomId" element={<EditRoom />} />
            <Route path="/existing-rooms" element={<ExistingRoom />} />
          </Routes>
        </Router>
      </main>
    </>
  )
}

export default App
