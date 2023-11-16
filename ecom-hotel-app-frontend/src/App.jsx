import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AddRoom } from './components/room/AddRoom'
import { ExistingRoom } from './components/room/ExistingRoom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <AddRoom/>
     <ExistingRoom />
    </>
  )
}

export default App
