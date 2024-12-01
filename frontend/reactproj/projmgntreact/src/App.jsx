import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import Home from './pages/Home/Home'
import NavBar from './pages/NavBar/NavBar'

function App() {

  return (
    <>
      <NavBar></NavBar>
      <Home/>
    </>
  )
}

export default App
